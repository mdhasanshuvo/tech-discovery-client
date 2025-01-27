import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { FiCheckCircle, FiThumbsUp } from "react-icons/fi";
import Swal from "sweetalert2";
import Slider from "react-slick"; // Import the slider library
import "slick-carousel/slick/slick.css"; // Slider styles
import "slick-carousel/slick/slick-theme.css";

const TrendingProducts = () => {
    const [products, setProducts] = useState([]);
    const [coupons, setCoupons] = useState([]); // State for coupons
    const { user } = useContext(AuthContext); // Get current user from context
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch trending products from the API
        const fetchTrendingProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/tproducts/trending");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching trending products:", error);
            }
        };

        // Fetch coupons from the API
        const fetchCoupons = async () => {
            try {
                const response = await axios.get("http://localhost:5000/valid");
                setCoupons(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching coupons:", error);
            }
        };

        fetchTrendingProducts();
        fetchCoupons();
    }, []);

    const handleVoteToggle = async (id) => {
        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "Please login first!",
                text: "You need to be logged in to vote.",
            });
            navigate("/auth/login");
            return;
        }

        const product = products.find((prod) => prod._id === id);

        if (product.owner.email === user?.email) {
            Swal.fire({
                icon: "error",
                title: "You cannot vote on your own product!",
                text: "Voting on a product you created is not allowed.",
            });
            return;
        }

        const isAlreadyVoted = product.voters?.includes(user?.email);

        try {
            if (isAlreadyVoted) {
                await axios.patch(`http://localhost:5000/products/${id}/downvote`, {
                    userEmail: user?.email,
                });
                Swal.fire({
                    icon: "success",
                    title: "Your vote was removed!",
                    text: "You have successfully removed your vote.",
                });
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === id
                            ? {
                                ...product,
                                votes: product.votes - 1,
                                voters: product.voters.filter((email) => email !== user?.email),
                            }
                            : product
                    )
                );
            } else {
                await axios.patch(`http://localhost:5000/products/${id}/upvote`, {
                    userEmail: user?.email,
                });
                Swal.fire({
                    icon: "success",
                    title: "Your vote was added!",
                    text: "You have successfully upvoted this product.",
                });
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === id
                            ? {
                                ...product,
                                votes: product.votes + 1,
                                voters: [...product.voters, user?.email],
                            }
                            : product
                    )
                );
            }
        } catch (error) {
            console.error("Error updating vote:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "There was an error while processing your vote.",
            });
        }
    };

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="container mx-auto px-4 my-8">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
                Trending Products
            </h2>
            {/* Coupon Slider Section */}
            <div className="my-12">
                <Slider {...sliderSettings}>
                    {coupons.map((coupon) => (
                        <div
                            key={coupon._id}
                            className="p-8 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center flex flex-col items-center"
                        >
                            <h3 className="text-2xl font-bold text-green-800 mb-4 tracking-wider">
                               Use Code: {coupon.code}
                            </h3>
                            <p className="text-gray-700 text-sm mb-2 italic">{coupon.description}</p>
                            <p className="text-xl font-semibold text-green-900 mb-3">
                                🎉 {coupon.discount}% Off
                            </p>
                            <div className="bg-white py-2 px-4 rounded-full shadow-md">
                                <span className="text-sm font-medium text-gray-600">
                                    Expires on:{" "}
                                </span>
                                <span className="text-sm font-bold text-red-600">
                                    {new Date(coupon.expiryDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="p-4">
                            <h2
                                onClick={() => navigate(`/product-details/${product._id}`)}
                                className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-blue-500 transition-colors duration-300"
                            >
                                {product.name}
                            </h2>
                            <div className="flex gap-2 my-3 flex-wrap">
                                {product.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                                    >
                                        {tag.text}
                                    </span>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => handleVoteToggle(product._id)}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-transform transform hover:scale-105 ${product.owner.email === user?.email
                                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`}
                                >
                                    {product.voters?.includes(user?.email) ? (
                                        <FiCheckCircle className="text-lg" />
                                    ) : (
                                        <FiThumbsUp className="text-lg" />
                                    )}
                                    {product.votes || 0}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default TrendingProducts;
