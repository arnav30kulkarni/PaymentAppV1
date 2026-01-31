const express=require("express");
const zod=require("zod");
const jwt=require("jsonwebtoken");
const secretkey=process.env.JWT_SECRET;
const { User } = require("../config/userschema");
const { Account }=require("../config/bankschema");
const { authMiddleware } = require("../middlware/authMiddleware");
const router=express.Router();

const signupSchema=zod.object({
    firstname:zod.string().min(1),
    lastname:zod.string().min(1),
    username:zod.string().email(),
    password:zod.string().min(6)
})

router.post("/signup",async(req,res)=>{
    const body=req.body;
    const parsedSignup=signupSchema.safeParse(body);
    if(!parsedSignup.success){
        return res.status(400).json({
            msg:"Invalid inputs"
        })
    }

    const user = User.findOne({
        username:body.username,
    })

    if(user._id){
        return res.status(400).json({
            msg:"The user already exists"
        })
    }

    const dbUser =await User.create({
        firstname:body.firstname,
        lastname:body.lastname,
        username:body.username,
        password:body.password
    });
    const userId=dbUser._id;

    await Account.create({
        userId,
        balance:Number((1+Math.random()*10000).toFixed(2))
    });

    const token=jwt.sign({
        userId:dbUser._id
    },secretkey);

    res.json({
        msg:"user created sucessfully",
        token:token

    });
})

const loginSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6)
})

router.post("/signin",async(req,res)=>{
    const body=req.body;

    const parsedSignin=loginSchema.safeParse(body);
    if(!parsedSignin.success){
        return res.status(403).json({
            msg:"Invalid inputs"
        })
    }
    const user=await User.findOne({
        username:body.username,
        password:body.password
    })
    if(!user._id){
        res.status(404).json({
            msg:"User not found"
        })
    }else{
        const token=jwt.sign({
            userId:user._id
        },secretkey);
        res.json({
            msg:"User signed in sucessfully",
            token:token
        })
    }
});

const updateSchema=zod.object({
    firstname:zod.string().min(1).optional(),
    lastname:zod.string().min(1).optional(),
    password:zod.string().min(6).optional()
})

router.put("/",authMiddleware,async(req,res)=>{
    const body=req.body;
    if(!updateSchema.safeParse(body).success){
        res.status(403).json({
            msg:"Invalid inputs"
        })
    }
    const updateUser=await User.updateOne({
        _id:req.userId
    },{
        $set:body
    })

    res.json({
        msg:"User updated successfully"
    });
});

router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
    $or: [
        { firstname: { $regex: filter, $options: "i" } },
        { lastname: { $regex: filter, $options: "i" } },
    ]
    });


    res.json({
        users:users.map(user=>{
            return{
                firstname:user.firstname,
                lastname:user.lastname,
                username:user.username,
                id:user._id
            }
        })
    })
    
})
module.exports=router;