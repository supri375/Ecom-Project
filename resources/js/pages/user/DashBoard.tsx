import React from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/components/frontend/navbar";

const UserDashboard = ({ children, user , orders }) => {
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
                    {children}
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
