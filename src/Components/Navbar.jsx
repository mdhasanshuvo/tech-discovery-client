import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="container mx-auto px-2">
            <div className="navbar bg-base-100">
                {/* Navbar Start: Logo and Hamburger */}
                <div className="navbar-start">
                    <div className="dropdown">
                        {/* Hamburger menu for mobile */}
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary" : "")}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" className={({ isActive }) => (isActive ? "text-primary" : "")}>
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" className={({ isActive }) => (isActive ? "text-primary" : "")}>
                                    About
                                </NavLink>
                                <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-primary" : "")}>
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-primary">
                        Tech Discovery
                    </Link>
                </div>

                {/* Navbar Center: Links for Desktop */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary" : "")}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/products" className={({ isActive }) => (isActive ? "text-primary" : "")}>
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => (isActive ? "text-primary" : "")}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-primary" : "")}>
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Navbar End: Authentication Section */}
                <div className="navbar-end">
                    {!user ? (
                        <Link to="/auth/login" className="btn btn-primary">
                            Login / Register
                        </Link>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <img
                                    className="w-7 sm:w-9 rounded-full cursor-pointer border-4 border-primary"
                                    src={user?.photoURL}
                                    alt="Avatar"
                                />
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <span className="font-bold">{user.displayName}</span>
                                </li>
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link
                                        className="btn btn-ghost"
                                        onClick={logout}
                                        to="/">
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
