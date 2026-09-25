const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { User } = require("../config/userschema");
const { Account } = require("../config/bankschema");
const { authMiddleware } = require("../middlware/authMiddleware");

const router = express.Router();

const secretkey = process.env.JWT_SECRET;

const signupSchema = zod.object({
  firstname: zod.string().min(1),
  lastname: zod.string().min(1),
  username: zod.string().email(),
  password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;

    const parsedSignup = signupSchema.safeParse(body);
    if (!parsedSignup.success) {
      return res.status(400).json({
        msg: "Invalid inputs",
      });
    }

    const existingUser = await User.findOne({
      username: body.username,
    });

    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const dbUser = await User.create({
      firstname: body.firstname,
      lastname: body.lastname,
      username: body.username,
      password: hashedPassword,
    });

    const userId = dbUser._id;

    await Account.create({
      userId,
      balance: Number((1 + Math.random() * 10000).toFixed(2)),
    });

    const token = jwt.sign(
      { userId: dbUser._id },
      secretkey,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "User created successfully",
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

const loginSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

router.post("/signin", async (req, res) => {
  try {
    const body = req.body;

    const parsedSignin = loginSchema.safeParse(body);
    if (!parsedSignin.success) {
      return res.status(403).json({
        msg: "Invalid inputs",
      });
    }

    const user = await User.findOne({ username: body.username });

    const passwordMatches = user && (await bcrypt.compare(body.password, user.password));

    if (!user || !passwordMatches) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      secretkey,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "User signed in successfully",
      token,
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

const updateSchema = zod.object({
  firstname: zod.string().min(1).optional(),
  lastname: zod.string().min(1).optional(),
  currentPassword: zod.string().min(1).optional(),
  password: zod.string().min(6).optional(),
});

const pinSchema = zod.object({
  currentPassword: zod.string().min(1),
  pin: zod.string().regex(/^\d{4,6}$/),
});

const profilePictureSchema = zod.object({
  profilePicture: zod.string()
    .regex(/^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/)
    .max(3_000_000),
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    const body = req.body;

    const parsedUpdate = updateSchema.safeParse(body);
    if (!parsedUpdate.success) {
      return res.status(403).json({
        msg: "Invalid inputs",
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const updateData = {};
    if (body.firstname) updateData.firstname = body.firstname;
    if (body.lastname) updateData.lastname = body.lastname;

    if (body.password) {
      if (!body.currentPassword) {
        return res.status(400).json({ msg: "Current password is required" });
      }

      const currentPasswordMatches = await bcrypt.compare(
        body.currentPassword,
        user.password
      );
      if (!currentPasswordMatches) {
        return res.status(401).json({ msg: "Current password is incorrect" });
      }

      updateData.password = await bcrypt.hash(body.password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ msg: "No fields to update" });
    }

    await User.updateOne({ _id: req.userId }, { $set: updateData });

    res.json({
      msg: "User updated successfully",
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/pin", authMiddleware, async (req, res) => {
  try {
    const parsedPin = pinSchema.safeParse(req.body);
    if (!parsedPin.success) {
      return res.status(400).json({ msg: "Enter your password and a 4 to 6 digit PIN" });
    }

    const user = await User.findById(req.userId).select("password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const passwordMatches = await bcrypt.compare(
      parsedPin.data.currentPassword,
      user.password
    );
    if (!passwordMatches) {
      return res.status(401).json({ msg: "Current password is incorrect" });
    }

    await User.updateOne(
      { _id: req.userId },
      { $set: { paymentPin: await bcrypt.hash(parsedPin.data.pin, 10) } }
    );

    res.json({ msg: "Payment PIN configured successfully" });
  } catch (err) {
    console.error("PIN configuration error:", err);
    res.status(500).json({ msg: "Unable to configure payment PIN" });
  }
});

router.put("/profile-picture", authMiddleware, async (req, res) => {
  try {
    const parsedPicture = profilePictureSchema.safeParse(req.body);
    if (!parsedPicture.success) {
      return res.status(400).json({ msg: "Use a PNG, JPG, or WebP image under 1.5 MB" });
    }

    await User.updateOne(
      { _id: req.userId },
      { $set: { profilePicture: parsedPicture.data.profilePicture } }
    );

    res.json({
      msg: "Profile picture updated successfully",
      profilePicture: parsedPicture.data.profilePicture,
    });
  } catch (err) {
    console.error("Profile picture error:", err);
    res.status(500).json({ msg: "Unable to update profile picture" });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      _id: { $ne: new mongoose.Types.ObjectId(req.userId) },
      $or: [
        { firstname: { $regex: filter, $options: "i" } },
        { lastname: { $regex: filter, $options: "i" } },
      ],
    });

    res.json({
      users: users.map((user) => ({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        id: user._id,
        profilePicture: user.profilePicture || "",
      })),
    });
  } catch (err) {
    console.error("Error in /bulk:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/recipient/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid recipient" });
    }

    const user = await User.findById(req.params.id).select("firstname lastname username profilePicture");
    if (!user) {
      return res.status(404).json({ msg: "Recipient not found" });
    }

    res.json({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      profilePicture: user.profilePicture || "",
    });
  } catch (err) {
    console.error("Recipient profile error:", err);
    res.status(500).json({ msg: "Unable to load recipient" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      id: user._id,
      pinConfigured: Boolean(user.paymentPin),
      profilePicture: user.profilePicture || "",
    });
  } catch (err) {
    console.error("/me error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
