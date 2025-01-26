import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isAdmin, setIsAdmin] = useState(null);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        const fetchAdminStatus = async () => {
            if (user?.email) {
                setIsAdminLoading(true);
                try {
                    const res = await axiosSecure.get(`/users/admin/${user.email}`);
                    setIsAdmin(res.data?.admin || false);
                } catch (error) {
                    console.error("Error checking admin status:", error);
                    setIsAdmin(false);
                } finally {
                    setIsAdminLoading(false);
                }
            } else {
                setIsAdmin(false);
                setIsAdminLoading(false);
            }
        };

        fetchAdminStatus();
    }, [user?.email]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
