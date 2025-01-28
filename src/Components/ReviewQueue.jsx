import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ReviewQueue = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://product-hunt-server-five.vercel.app/queue-products/review-queue');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching review queue:', error);
                Swal.fire('Error', 'Failed to fetch products', 'error');
            }
        };

        fetchProducts();
    }, [products]);

    const updateProductStatus = async (id, status) => {
        try {
            const response = await axios.patch(`https://product-hunt-server-five.vercel.app/products/${id}/status`, { status });
            Swal.fire('Success', response.data.message, 'success');
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === id ? { ...product, status } : product
                )
            );
        } catch (error) {
            console.error('Error updating product status:', error);
            Swal.fire('Error', 'Failed to update product status', 'error');
        }
    };

    const makeFeatured = async (id) => {
        try {
            const response = await axios.patch(`https://product-hunt-server-five.vercel.app/products/${id}/featured`);
            Swal.fire('Success', response.data.message, 'success');
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === id ? { ...product, featured: true } : product
                )
            );
        } catch (error) {
            console.error('Error marking product as featured:', error);
            Swal.fire('Error', 'Failed to mark product as featured', 'error');
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-center text-primary my-6">Product Review Queue</h1>

            {products.length === 0 ? (
                <p className="text-center text-gray-500">No products in the review queue.</p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-4 py-3 border text-sm font-semibold text-gray-700">Product Name</th>
                                <th className="px-4 py-3 border text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 border">{product.name}</td>
                                    <td className="px-4 py-3 border flex gap-2 justify-start items-center">
                                        <button
                                            onClick={() => navigate(`/product-details/${product._id}`)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => makeFeatured(product._id)}
                                            disabled={product.featured}
                                            className={`px-4 py-2 rounded-md text-sm font-medium ${product.featured
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-green-500 text-white hover:bg-green-600 transition'}`}
                                        >
                                            {product.featured ? 'Featured' : 'Make Featured'}
                                        </button>
                                        <button
                                            onClick={() => updateProductStatus(product._id, 'Accepted')}
                                            disabled={product.status === 'Accepted'}
                                            className={`px-4 py-2 rounded-md text-sm font-medium ${product.status === 'Accepted'
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-green-500 text-white hover:bg-green-600 transition'}`}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => updateProductStatus(product._id, 'Rejected')}
                                            disabled={product.status === 'Rejected'}
                                            className={`px-4 py-2 rounded-md text-sm font-medium ${product.status === 'Rejected'
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-red-500 text-white hover:bg-red-600 transition'}`}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReviewQueue;
