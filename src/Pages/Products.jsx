import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FiThumbsUp, FiCheckCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/product', {
                    params: { page, search },
                });
                setProducts(response.data.products);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [page, search]);

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
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-6">Products</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by tags..."
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded mb-4"
                        />
                        <h2
                            onClick={() => navigate(`/product-details/${product._id}`)}
                            className="text-lg font-semibold cursor-pointer hover:underline"
                        >
                            {product.name}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">
                            Tags: {product.tags.map(tag => tag.text).join(', ')}
                        </p>
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
                ))}
            </div>
            <div className="flex justify-center mt-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-4 py-2 mx-1 rounded ${page === pageNum
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Products;
