import React from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/components/frontend/navbar";

const UserDashboard = ({ user }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Dashboard" />
            <Navbar />

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md p-6 min-h-screen">
                    <h2 className="text-xl font-bold mb-6">Dashboard</h2>
                    <nav className="space-y-4">
                        <Link
                            href={`/user/profile/${user.id}`}
                            className="block px-3 py-2 rounded hover:bg-gray-200"
                        >
                            Profile
                        </Link>
                        <Link
                            href={`/user/orders/${user.id}`}
                            className="block px-3 py-2 rounded hover:bg-gray-200"
                        >
                            My Orders
                        </Link>
                        <Link
                            href={`/user/profile/edit/${user.id}`}
                            className="block px-3 py-2 rounded hover:bg-gray-200"
                        >
                            Edit Profile
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="block px-3 py-2 rounded hover:bg-red-500 hover:text-white"
                        >
                            Log Out
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
                        <img
                            src={user.image || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                            <p><span className="font-medium">Address:</span> {user.address}</p>
                            <p><span className="font-medium">City:</span> {user.city}</p>
                            <p><span className="font-medium">State:</span> {user.state}</p>
                            <p><span className="font-medium">Postal Code:</span> {user.postal_code}</p>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
