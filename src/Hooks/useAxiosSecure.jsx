import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
    const navigate = useNavigate();

    const axiosSecureInstance = axios.create({
        baseURL: "http://localhost:5000",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
    });

    useEffect(() => {
        // Intercept responses to handle 401 errors globally
        axiosSecureInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("access-token");
                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );
    }, [navigate, axiosSecureInstance]);

    return axiosSecureInstance;
};

export default useAxiosSecure;
