import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FiLogOut, FiUser, FiHome, FiSettings, FiBarChart2 } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import useAdmin from "../Hooks/useAdmin";
import useModerator from "../Hooks/useModerator";
import { Helmet } from "react-helmet";
// import { useModerator } from "../hooks/useModerator"; // Hook to check Moderator role

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/");
        console.log("Logged out successfully");
      })
      .catch((err) => console.error(err));
  };

  const renderLinks = () => {
    if (isAdmin) {
      return (
        <>
          <Helmet>
            <title>Admin-Dashboard | Tech Discovery</title>
          </Helmet>
          <Link
            to="/dashboard/statistics"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition"
          >
            <MdDashboard size={20} />
            <span>Statistics</span>
          </Link>
          <Link
            to="/dashboard/manage-users"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition"
          >
            <FiUser size={20} />
            <span>Manage Users</span>
          </Link>
          <Link
            to="/dashboard/manage-coupons"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition"
          >
            <FiSettings size={20} />
            <span>Manage Coupons</span>
          </Link>
        </>
      );
    } else if (isModerator) {
      return (
        <>
          <Helmet>
            <title>Moderator-Dashboard | Tech Discovery</title>
          </Helmet>
          <Link
            to="/dashboard/moderator-statistics"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition"
          >
            <MdDashboard size={20} />
            <span>Statistics</span>
          </Link>
          <Link
            to="/dashboard/review-queue"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition"
          >
            <FiHome size={20} />
            <span>Product Review Queue</span>
          </Link>
          <Link
            to="/dashboard/reported-contents"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition"
          >
            <FiUser size={20} />
            <span>Reported Contents</span>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Helmet>
            <title>User-Dashboard | Tech Discovery</title>
          </Helmet>

          <Link
            to="/dashboard/my-profile"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition"
          >
            <FiUser size={20} />
            <span>My Profile</span>
          </Link>

          <Link
            to="/dashboard/add-product"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition"
          >
            <FiHome size={20} />
            <span>Add Product</span>
          </Link>

          <Link
            to="/dashboard/my-products"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition"
          >
            <FiSettings size={20} />
            <span>My Products</span>
          </Link>

          {/* New Link to Statistics Page */}
          <Link
            to="/dashboard/user-statistics"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition"
          >
            <FiBarChart2 size={20} />
            <span>My Statistics</span>
          </Link>
        </>

      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="py-6 px-4">
          <Link to="/">
            <h1 className="text-center text-2xl font-bold mb-8">Tech Discovery</h1>
          </Link>
          <nav className="space-y-4">{renderLinks()}</nav>
        </div>
        <div className="mt-auto py-4 px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">
              Hello, {user?.displayName || "Guest"}!
            </p>
            <div className="relative group">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
            </div>
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
