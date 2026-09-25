import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    currentPassword: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pinForm, setPinForm] = useState({ currentPassword: "", pin: "" });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:4500/api/v1/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setForm((currentForm) => ({
          ...currentForm,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
        }));
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.msg || "Unable to load profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (!token) return <Navigate to="/" replace />;
  if (loading) return <div className="text-center mt-16">Loading...</div>;
  if (!user) return <div className="text-center mt-16">User not found</div>;

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const updateData = {};
    if (form.firstname.trim() !== user.firstname) updateData.firstname = form.firstname.trim();
    if (form.lastname.trim() !== user.lastname) updateData.lastname = form.lastname.trim();
    if (form.password.trim()) {
      updateData.password = form.password;
      updateData.currentPassword = form.currentPassword;
    }

    if (!Object.keys(updateData).length) {
      setError("Make a change before saving.");
      return;
    }

    try {
      await axios.put("http://localhost:4500/api/v1/user", updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...user, firstname: form.firstname.trim(), lastname: form.lastname.trim() });
      setForm({ ...form, firstname: form.firstname.trim(), lastname: form.lastname.trim(), currentPassword: "", password: "" });
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to update profile.");
    }
  };

  const handlePinUpdate = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.put("http://localhost:4500/api/v1/user/pin", pinForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPinForm({ currentPassword: "", pin: "" });
      setUser({ ...user, pinConfigured: true });
      setMessage("Payment PIN configured successfully.");
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to configure payment PIN.");
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.match(/^image\/(png|jpeg|webp)$/) || file.size > 1.5 * 1024 * 1024) {
      setError("Choose a PNG, JPG, or WebP image under 1.5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const response = await axios.put("http://localhost:4500/api/v1/user/profile-picture", {
          profilePicture: reader.result,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ ...user, profilePicture: response.data.profilePicture });
        setMessage("Profile picture updated successfully.");
        setError("");
      } catch (err) {
        setError(err.response?.data?.msg || "Unable to update profile picture.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-(--color-bg) px-4 py-10 text-(--text-primary)">
      <div className="mx-auto max-w-2xl">
        <button type="button" onClick={() => navigate("/newdashboard")} className="mb-6 text-sm font-semibold text-(--text-secondary) hover:text-(--text-primary)">
          Back to dashboard
        </button>
        <div className="rounded-2xl border border-(--color-border)/20 bg-(--color-bg-secondary) p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex items-center gap-4">
            <label className="group relative block size-16 cursor-pointer overflow-hidden rounded-full bg-(--color-accent) text-2xl font-bold text-white">
              {user.profilePicture ? <img src={user.profilePicture} alt="Profile" className="size-full object-cover" /> : <span className="grid size-full place-items-center">{user.firstname[0]}{user.lastname[0]}</span>}
              <span className="absolute inset-0 grid place-items-center bg-black/55 text-xs font-semibold opacity-0 transition group-hover:opacity-100">Change</span>
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handlePictureChange} className="sr-only" />
            </label>
            <div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">User information</h1>
              <p className="text-sm text-(--text-secondary)">{user.username}</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold">Firstname<input name="firstname" value={form.firstname} onChange={handleChange} className="mt-2 w-full rounded-xl border border-(--color-border)/25 bg-transparent px-3 py-2.5 font-normal outline-none focus:border-(--color-accent)" /></label>
              <label className="text-sm font-semibold">Lastname<input name="lastname" value={form.lastname} onChange={handleChange} className="mt-2 w-full rounded-xl border border-(--color-border)/25 bg-transparent px-3 py-2.5 font-normal outline-none focus:border-(--color-accent)" /></label>
            </div>
            <div className="border-t border-(--color-border)/15 pt-5">
              <h2 className="font-semibold">Change password</h2>
              <p className="mt-1 text-sm text-(--text-secondary)">Enter your current password again to confirm this change.</p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">Current password<input name="currentPassword" type="password" value={form.currentPassword} onChange={handleChange} className="mt-2 w-full rounded-xl border border-(--color-border)/25 bg-transparent px-3 py-2.5 font-normal outline-none focus:border-(--color-accent)" /></label>
                <label className="text-sm font-semibold">New password<input name="password" type="password" value={form.password} onChange={handleChange} className="mt-2 w-full rounded-xl border border-(--color-border)/25 bg-transparent px-3 py-2.5 font-normal outline-none focus:border-(--color-accent)" /></label>
              </div>
            </div>
            <div className="border-t border-(--color-border)/15 pt-5">
              <h2 className="font-semibold">Payment PIN</h2>
              <p className="mt-1 text-sm text-(--text-secondary)">{user.pinConfigured ? "Change your PIN used to authorize payments." : "Configure a PIN before making payments."}</p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">Account password<input required type="password" value={pinForm.currentPassword} onChange={(event) => setPinForm({ ...pinForm, currentPassword: event.target.value })} className="mt-2 w-full rounded-xl border border-(--color-border)/25 bg-transparent px-3 py-2.5 font-normal outline-none focus:border-(--color-accent)" /></label>
                <label className="text-sm font-semibold">New payment PIN<input required type="password" inputMode="numeric" maxLength={6} value={pinForm.pin} onChange={(event) => setPinForm({ ...pinForm, pin: event.target.value.replace(/\D/g, "").slice(0, 6) })} placeholder="4 to 6 digits" className="mt-2 w-full rounded-xl border border-(--color-border)/25 bg-transparent px-3 py-2.5 font-normal outline-none focus:border-(--color-accent)" /></label>
                <button type="button" onClick={handlePinUpdate} className="rounded-xl border border-(--color-accent) px-4 py-2.5 text-sm font-bold text-(--color-accent-hover) transition hover:bg-(--accent-background) sm:col-span-2">{user.pinConfigured ? "Update payment PIN" : "Configure payment PIN"}</button>
              </div>
            </div>
            {message && <p className="text-sm text-(--color-positive)">{message}</p>}
            {error && <p className="text-sm text-(--color-negative)">{error}</p>}
            <button type="submit" className="w-full rounded-xl bg-(--color-primary) px-4 py-3 font-semibold text-(--color-bg) transition hover:opacity-85">Save changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
