import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const AdminProfile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-8">
                <div className="text-center">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt="User"
                        className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500"
                    />
                    <h2 className="text-2xl font-bold mt-4 text-gray-800">
                        {user?.displayName || "Name not available"}
                    </h2>
                    <p className="text-gray-500">{user?.email}</p>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-700">
                        <strong>Phone:</strong> +1 (123) 456-7890
                    </p>
                    <p className="text-gray-700">
                        <strong>Address:</strong> 1234 Elm Street, New York, USA
                    </p>
                    <p className="text-gray-700">
                        <strong>Joined:</strong> January 2025
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
