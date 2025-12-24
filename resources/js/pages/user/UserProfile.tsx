import React from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Layout } from "lucide-react";
import Navbar from "@/components/frontend/navbar";
import UserDashboard from "./DashBoard";

const UserProfile = ({ user, orders }) => {

    const handleCancel = (orderId, status) => {
        if (status === "processing" || status === "On The Way" || status === "delivered") {
            alert("This order cannot be cancelled as it is past processing stage.");
            return;
        }
        else {
            router.post(`/order/${orderId}/cancel`, {}, {
                onSuccess: () => {
                    console.log("Deleted Successfully");
                }
            });
        }
    };



    return (
        <UserDashboard user={user} orders = {orders}>
                {/* Profile Header */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
                    <img
                        src={`/storage/${user.image}`}
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
    </UserDashboard>
    );
};

export default UserProfile;
