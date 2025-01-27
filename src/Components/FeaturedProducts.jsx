import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import { FiCheckCircle, FiThumbsUp } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Products = () => {
    const [Products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/f-products/featured');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            }
        };

        fetchProducts();
    }, []);

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

        const product = Products.find((prod) => prod._id === id);

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
        <div className='container mx-auto px-2'>
            <div className="featured-section px-6 py-12">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Featured Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Products.map((product) => (
                        <div
                            key={product._id}
                            className="card border rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-1 transform"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                            <div className="p-4 space-y-3">
                                <h2
                                    onClick={() => navigate(`/product-details/${product._id}`)}
                                    className="text-lg font-bold text-gray-800 cursor-pointer hover:underline"
                                >
                                    {product.name}
                                </h2>
                                <p className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="badge badge-primary bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium hover:bg-blue-200"
                                        >
                                            {tag.text}
                                        </span>
                                    ))}
                                </p>
                                <button
                                    onClick={() => handleVoteToggle(product._id)}
                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-transform transform duration-200 ${product.owner.email === user?.email
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                                        }`}
                                >
                                    {product.voters?.includes(user?.email) ? (
                                        <FiCheckCircle className="text-green-500" />
                                    ) : (
                                        <FiThumbsUp />
                                    )}
                                    <span className="text-sm font-semibold">{product.votes || 0}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
