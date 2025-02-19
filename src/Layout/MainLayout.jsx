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
            <div className="sticky top-0 z-50">
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;