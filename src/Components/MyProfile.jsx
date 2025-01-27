import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

const MyProfile = () => {
    const { user } = useContext(AuthContext); // Current user from Firebase
    const [subscribed, setSubscribed] = useState(false); // Subscription status
    const subscriptionAmount = 100; // Example subscription amount

    // Fetch subscription status on component load
    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user/subscription`, {
                    params: { email: user.email },
                    withCredentials: true,
                });
                setSubscribed(response.data.subscribed);
            } catch (error) {
                console.error("Error fetching subscription status:", error);
            }
        };

        if (user?.email) {
            checkSubscription();
        }
    }, [user?.email]);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                <div className="text-center">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt="User"
                        className="w-24 h-24 rounded-full mx-auto"
                    />
                    <h2 className="text-xl font-bold mt-4">{user?.displayName || "Name not available"}</h2>
                    <p className="text-gray-600">{user?.email}</p>
                </div>
                <div className="mt-6 text-center">
                    {subscribed ? (
                        <div className="bg-green-100 text-green-800 p-2 rounded-md">
                            <p className="font-semibold">Membership Status: Verified</p>
                        </div>
                    ) : (
                        <Link to="/dashboard/payment"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Subscribe - ${subscriptionAmount}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
