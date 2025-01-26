import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading";
import { AuthContext } from "../provider/AuthProvider";


const PrivateRoute = ({children}) => {

    const { user, loading } = useContext(AuthContext);

    const location = useLocation();
    
    console.log(location);

    if(loading){
        return <Loading></Loading>;
    }


    if (user) {
        return children;
    }
    return <Navigate state={location} to={`/auth/login`}></Navigate>
};

export default PrivateRoute;