import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useModerator = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isModerator, setIsModerator] = useState(null);
    const [isModeratorLoading, setIsModeratorLoading] = useState(true);

    useEffect(() => {
        const fetchModeratorStatus = async () => {
            if (user?.email) {
                setIsModeratorLoading(true);
                try {
                    const res = await axiosSecure.get(`/users/moderator/${user.email}`);
                    setIsModerator(res.data?.moderator || false);
                } catch (error) {
                    console.error("Error checking moderator status:", error);
                    setIsModerator(false);
                } finally {
                    setIsModeratorLoading(false);
                }
            } else {
                setIsModerator(false);
                setIsModeratorLoading(false);
            }
        };

        fetchModeratorStatus();
    }, [user?.email]);

    return [isModerator, isModeratorLoading];
};

export default useModerator;
