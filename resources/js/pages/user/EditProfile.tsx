import React, { useState } from "react";
import { router } from "@inertiajs/react";
import UserDashboard from "./DashBoard";

const EditProfile = ({ user, orders }) => {

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>();
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
    postal_code: user.postal_code || "",
    password: "",
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("address", form.address);
    fd.append("city", form.city);
    fd.append("state", form.state);
    fd.append("postal_code", form.postal_code);
    fd.append("password", form.password);
    if (image) {
      fd.append("image", image);
    }
    router.post(route('user.profile.update', user.id), fd, {
      onSuccess: () => {
        console.log("Successfully Updated Profile");
      },
    });
  };

  const handleImage = (e) => {
    const imgfile = e.target.files?.[0];
    if (imgfile) {
      setImage(imgfile);
      setPreviewUrl(URL.createObjectURL(imgfile));
    }
  }

  return (
    <UserDashboard user={user} orders={orders}>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your email"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your address"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">City</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your city"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">State</label>
            <input
              type="text"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your state"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Postal Code</label>
            <input
              type="text"
              value={form.postal_code}
              onChange={(e) => setForm({ ...form, postal_code: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your postal code"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Drop PfP Image</label>
            <input
              type="file"
              onChange={handleImage}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Drop Image"
            />
          </div>
          {
            previewUrl ? <img src={previewUrl} width="100px" height="100px" /> : <img src={`/storage/${user.image}`} width="100px" height="100px" />
          }
          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">New Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter new password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </UserDashboard>
  );
};

export default EditProfile;
