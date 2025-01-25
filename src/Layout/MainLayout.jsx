import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../Pages/Loading";

const MainLayout = () => {
    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;