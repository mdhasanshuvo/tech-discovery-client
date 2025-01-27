import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { FiCheckCircle, FiThumbsUp } from "react-icons/fi";
import Swal from "sweetalert2";

const TrendingProducts = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext) // Get current user from context
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch trending products from the API
        const fetchTrendingProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/tproducts/trending");
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching trending products:", error);
            }
        };

        fetchTrendingProducts();
    }, [products]);


    const handleVoteToggle = async (id) => {
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Please login first!',
                text: 'You need to be logged in to vote.',
            });
            navigate('/auth/login');
            return;
        }

        const product = products.find((prod) => prod._id === id);

        if (product.owner.email === user?.email) {
            Swal.fire({
                icon: 'error',
                title: 'You cannot vote on your own product!',
                text: 'Voting on a product you created is not allowed.',
            });
            return;
        }

        const isAlreadyVoted = product.voters?.includes(user?.email);

        try {
            if (isAlreadyVoted) {
                // Send a downvote request (remove vote)
                await axios.patch(`http://localhost:5000/products/${id}/downvote`, {
                    userEmail: user?.email,
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Your vote was removed!',
                    text: 'You have successfully removed your vote.',
                });
                // Update both `votes` and `voters` in the local state
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
                // Send an upvote request (add vote)
                await axios.patch(`http://localhost:5000/products/${id}/upvote`, {
                    userEmail: user?.email,
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Your vote was added!',
                    text: 'You have successfully upvoted this product.',
                });
                // Update both `votes` and `voters` in the local state
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
            console.error('Error updating vote:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error while processing your vote.',
            });
        }
    };

    return (
        <div className="container mx-auto mx-2 my-8">
            <h2 className="text-2xl font-bold text-center mb-6">Trending Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="card shadow-lg p-4 rounded-lg border border-gray-200"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2
                            onClick={() => navigate(`/product-details/${product._id}`)}
                            className="text-xl font-semibold cursor-pointer hover:underline"
                        >
                            {product.name}
                        </h2>
                        <div className="flex gap-2 my-2">
                            {product.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-sm bg-gray-100 border rounded-full"
                                >
                                    {tag.text}
                                </span>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => handleVoteToggle(product._id)}
                                className={`flex items-center justify-center gap-2 px-4 py-2 rounded ${product.owner.email === user?.email
                                    ? 'bg-gray-400'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                            >
                                {product.voters?.includes(user?.email) ? (
                                    <FiCheckCircle />
                                ) : (
                                    <FiThumbsUp />
                                )}
                                {product.votes || 0}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-8">
                <button
                    onClick={() => navigate("/products")}
                    className="px-6 py-2 bg-green-500 text-white rounded"
                >
                    Show All Products
                </button>
            </div>
        </div>
    );
};

export default TrendingProducts;
