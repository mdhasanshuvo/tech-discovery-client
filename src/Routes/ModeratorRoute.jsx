import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useModerator from "../Hooks/useModerator";
import Loading from "../Pages/Loading";

const ModeratorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isModerator, isModeratorLoading] = useModerator();

    if (loading || isModeratorLoading) {
        return <Loading />;
    }

    if (user && isModerator) {
        return children;
    }

    return <Navigate to="/auth/login" />;
};

export default ModeratorRoute;
