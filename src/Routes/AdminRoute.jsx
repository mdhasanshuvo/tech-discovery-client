import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import Loading from "../pages/Loading";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();

    if (loading || isAdminLoading) {
        return <Loading></Loading>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/auth/login"></Navigate>
};

export default AdminRoute;