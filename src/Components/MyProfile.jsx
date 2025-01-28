import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyProfile = () => {
    const { user, subscriptionAmount, updateSubscriptionAmount } = useContext(AuthContext);
    const [subscribed, setSubscribed] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponApplied, setCouponApplied] = useState(false);

    // Fetch subscription status
    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const response = await axios.get(`https://product-hunt-server-five.vercel.app/user/subscription`, {
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

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Empty Coupon Code",
                text: "Please enter a valid coupon code.",
            });
            return;
        }

        if (couponApplied) {
            Swal.fire({
                icon: "warning",
                title: "Coupon Already Applied",
                text: "You can only apply one coupon code.",
            });
            return;
        }

        try {
            const response = await axios.get(`https://product-hunt-server-five.vercel.app/coupons/validate`, {
                params: { code: couponCode },
                withCredentials: true,
            });

            if (response.data.success) {
                const coupon = response.data;
                const discountAmount = (subscriptionAmount * coupon.discount) / 100;
                const discountedPrice = subscriptionAmount - discountAmount;

                updateSubscriptionAmount(discountedPrice); // Update the subscription amount in context
                setAppliedCoupon(coupon);
                setCouponApplied(true);
                setCouponCode(""); // Clear input

                Swal.fire({
                    icon: "success",
                    title: "Coupon Applied",
                    text: `You have received a ${coupon.discount}% discount!`,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Invalid Coupon",
                    text: response.data.message || "The coupon code you entered is not valid.",
                });
            }
        } catch (error) {
            console.error("Error validating coupon:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "There was an issue applying your coupon. Please try again.",
            });
        }
    };

    return (
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-8">
                <div className="text-center">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt="User"
                        className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500"
                    />
                    <h2 className="text-2xl font-bold mt-4 text-gray-800">{user?.displayName || "Name not available"}</h2>
                    <p className="text-gray-600">{user?.email}</p>
                </div>
    
                <div className="mt-8">
                    {subscribed ? (
                        <div className="bg-green-100 text-green-800 py-3 px-4 rounded-md text-center">
                            <p className="font-semibold">Membership Status: Verified</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-semibold mb-2">Have a Coupon Code?</label>
                                <div className="flex flex-col sm:flex-row">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter your coupon code"
                                        className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={couponApplied}
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="mt-2 sm:mt-0 sm:px-4 py-2 bg-blue-500 text-white font-medium rounded-r-md hover:bg-blue-600 transition duration-300"
                                        disabled={couponApplied}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
    
                            {appliedCoupon && (
                                <div className="bg-blue-100 text-blue-700 py-2 px-4 rounded-md text-center mb-4">
                                    <p className="font-medium">
                                        Applied Coupon: <span className="font-bold">{appliedCoupon.code}</span>
                                        <span className="block text-sm">Discount: {appliedCoupon.discount}%</span>
                                    </p>
                                </div>
                            )}
    
                            <div className="text-center">
                                <p className="text-xl font-semibold text-gray-700 mb-2">
                                    Total: ${subscriptionAmount.toFixed(2)}
                                </p>
                                <Link
                                    to="/dashboard/payment"
                                    className="inline-block px-6 py-3 bg-blue-500 text-white font-bold rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
                                >
                                    Subscribe Now
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default MyProfile;
