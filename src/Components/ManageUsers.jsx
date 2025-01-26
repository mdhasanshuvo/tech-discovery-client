import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);

    // Fetch all users securely
    useEffect(() => {
        axiosSecure
            .get("/users")
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    }, [axiosSecure]);

    // Promote user to Admin
    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to promote this user to Admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, promote!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/users/${id}/role`, { role: "admin" })
                    .then(() => {
                        setUsers((prev) =>
                            prev.map((user) =>
                                user._id === id ? { ...user, role: "admin" } : user
                            )
                        );
                        Swal.fire("Promoted!", "User has been promoted to Admin.", "success");
                    })
                    .catch((err) => {
                        console.error(err);
                        Swal.fire("Error!", "Failed to promote user. Please try again.", "error");
                    });
            }
        });
    };

    // Promote user to Moderator
    const handleMakeModerator = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to promote this user to Moderator?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, promote!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/users/${id}/role`, { role: "moderator" })
                    .then(() => {
                        setUsers((prev) =>
                            prev.map((user) =>
                                user._id === id ? { ...user, role: "moderator" } : user
                            )
                        );
                        Swal.fire("Promoted!", "User has been promoted to Moderator.", "success");
                    })
                    .catch((err) => {
                        console.error(err);
                        Swal.fire("Error!", "Failed to promote user. Please try again.", "error");
                    });
            }
        });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Manage Users</h1>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2 text-left">Name</th>
                            <th className="border px-4 py-2 text-left">Email</th>
                            <th className="border px-4 py-2 text-left">Role</th>
                            <th className="border px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.role || "User"}</td>
                                <td className="border px-4 py-2 space-x-2 flex justify-center">
                                    <button
                                        onClick={() => handleMakeAdmin(user._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                                        disabled={user.role === "admin"}
                                    >
                                        Make Admin
                                    </button>
                                    <button
                                        onClick={() => handleMakeModerator(user._id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                                        disabled={user.role === "moderator"}
                                    >
                                        Make Moderator
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
