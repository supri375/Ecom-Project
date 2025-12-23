import React, { useState } from "react";
import { router } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";

const EditProfile = ({ user }) => {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    city: user.city,
    state: user.state,
    postal_code: user.postal_code,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(`/user/update-profile/${user.id}`, form);
  };

  return (
    <DashboardLayout>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="Name"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="Email"
          />
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="Address"
          />
          {/* Add other fields similarly */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditProfile;
