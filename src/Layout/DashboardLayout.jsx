import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FiLogOut, FiUser, FiHome, FiSettings } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
// import { useAdmin } from "../hooks/useAdmin"; // Hook to check Admin role
// import { useModerator } from "../hooks/useModerator"; // Hook to check Moderator role

const DashboardLayout = () => {
    const { user, logout } = useContext(AuthContext);
    //   const [isAdmin] = useAdmin();
    const isAdmin = true;
    //   const [isModerator] = useModerator();
    const isModerator = false;

    const handleLogout = () => {
        logout()
            .then(() => console.log("Logged out successfully"))
            .catch((err) => console.error(err));
    };

    // Sidebar Navigation Links based on Role
    const renderLinks = () => {
        if (isAdmin) {
            return (
                <>
                    <Link
                        to="/dashboard/statistics"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-focus"
                    >
                        <MdDashboard size={20} />
                        <span>Statistics</span>
                    </Link>
                    <Link
                        to="/dashboard/manage-users"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-focus"
                    >
                        <FiUser size={20} />
                        <span>Manage Users</span>
                    </Link>
                    <Link
                        to="/dashboard/manage-coupons"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-focus"
                    >
                        <FiSettings size={20} />
                        <span>Manage Coupons</span>
                    </Link>
                </>
            );
        } else if (isModerator) {
            return (
                <>
                    <Link
                        to="/dashboard/review-queue"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-focus"
                    >
                        <FiHome size={20} />
                        <span>Product Review Queue</span>
                    </Link>
                    <Link
                        to="/dashboard/reported-contents"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-focus"
                    >
                        <FiUser size={20} />
                        <span>Reported Contents</span>
                    </Link>
                </>
            );
        } else {
            return (
                <>
                    <Link
                        to="/dashboard/my-profile"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-focus"
                    >
                        <FiUser size={20} />
                        <span>My Profile</span>
                    </Link>
                    <Link
                        to="/dashboard/add-product"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-focus"
                    >
                        <FiHome size={20} />
                        <span>Add Product</span>
                    </Link>
                    <Link
                        to="/dashboard/my-products"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-focus"
                    >
                        <FiSettings size={20} />
                        <span>My Products</span>
                    </Link>
                </>
            );
        }
    };

    return (
        <div className="flex h-screen bg-base-200">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white">
                <div className="py-6 px-4">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold">Tech Discovery</h1>
                    </div>
                    <nav className="space-y-4">{renderLinks()}</nav>
                </div>
                <div className="absolute bottom-0 w-full py-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
                    >
                        <FiLogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <header className="bg-base-100 shadow-md px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-bold">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">Hello, {user?.displayName || "Guest"}!</p>
                        <img
                            src={user?.photoURL || "https://via.placeholder.com/40"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
