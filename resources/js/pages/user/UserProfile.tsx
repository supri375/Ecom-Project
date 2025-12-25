import React, { useState } from "react";
import { router } from "@inertiajs/react";
import {
    FiEdit2,
    FiMail,
    FiMapPin,
    FiUser,
    FiLock,
    FiCamera,
} from "react-icons/fi";
import UserDashboard from "./DashBoard";

interface Props {
    user: any;
    orders: any[];
}

const UserProfile: React.FC<Props> = ({ user, orders }) => {
    const [editing, setEditing] = useState<string | null>(null);
    const [value, setValue] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const submit = (field: string) => {
        const fd = new FormData();
        fd.append(field, value);

        router.post(route("user.profile.update", user.id), fd, {
            onSuccess: () => {
                setEditing(null);
                setValue("");
            },
        });
    };

    const uploadImage = (file: File) => {
        const fd = new FormData();
        fd.append("image", file);

        setImagePreview(URL.createObjectURL(file));

        router.post(route("user.profile.update", user.id), fd);
    };

    const InfoRow = ({
        label,
        icon,
        field,
        display,
        type = "text",
    }: any) => (
        <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-3 text-gray-700">
                {icon}
                <span className="font-medium">{label}</span>
            </div>

            {editing === field ? (
                <div className="flex gap-2">
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="border rounded px-2 py-1"
                        autoFocus
                    />
                    <button
                        onClick={() => submit(field)}
                        className="px-3 py-1 bg-green-600 cursor-pointer text-white rounded"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setEditing(null)}
                        className="px-3 py-1 bg-gray-300 cursor-pointer rounded"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <span className="text-gray-600">{display}</span>
                    <button
                        onClick={() => {
                            setEditing(field);
                            setValue(display ?? "");
                        }}
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                    >
                        <FiEdit2 />
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <UserDashboard user={user} orders={orders}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow p-6 text-center">
                    <div className="relative inline-block">
                        <img
                            src={
                                imagePreview
                                    ? imagePreview
                                    : `/storage/${user.image}`
                            }
                            className="w-32 h-32 rounded-full hover:opacity-60 object-cover border"
                        />
                        <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                            <FiCamera />
                            <input
                                type="file"
                                hidden
                                onChange={(e) =>
                                    e.target.files &&
                                    uploadImage(e.target.files[0])
                                }
                            />
                        </label>
                    </div>

                    <h2 className="mt-4 text-xl font-semibold">
                        {user.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Member since {new Date(user.created_at).getFullYear()}
                    </p>
                </div>

                {/* Profile Info */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Account Information
                    </h3>

                    <InfoRow
                        label="Full Name"
                        icon={<FiUser />}
                        field="name"
                        display={user.name}
                    />

                    <InfoRow
                        label="Email"
                        icon={<FiMail />}
                        field="email"
                        display={user.email}
                    />

                    <InfoRow
                        label="Address"
                        icon={<FiMapPin />}
                        field="address"
                        display={user.address ?? "—"}
                    />

                    <InfoRow
                        label="City"
                        icon={<FiMapPin />}
                        field="city"
                        display={user.city ?? "—"}
                    />

                    <InfoRow
                        label="State"
                        icon={<FiMapPin />}
                        field="state"
                        display={user.state ?? "—"}
                    />

                    <InfoRow
                        label="Postal Code"
                        icon={<FiMapPin />}
                        field="postal_code"
                        display={user.postal_code ?? "—"}
                    />

                    <InfoRow
                        label="Password"
                        icon={<FiLock />}
                        field="password"
                        display="••••••••"
                        type="password"
                    />
                </div>
            </div>
        </UserDashboard>
    );
};

export default UserProfile;
