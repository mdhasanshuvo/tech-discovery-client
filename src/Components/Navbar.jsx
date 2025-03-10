import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logout, toggleTheme } = useContext(AuthContext);

    return (
        <div className="bg-base-200">
            <div className="container mx-auto px-2">
                <div className="navbar">
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

                        <label className="swap swap-rotate ml-1" >
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="theme-controller" value="synthwave" onClick={toggleTheme} />

                            {/* sun icon */}
                            <svg
                                className="swap-off h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-on h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
