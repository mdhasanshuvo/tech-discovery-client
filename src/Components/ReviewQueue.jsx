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
                const response = await axios.get('http://localhost:5000/products/review-queue');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching review queue:', error);
                Swal.fire('Error', 'Failed to fetch products', 'error');
            }
        };

        fetchProducts();
    }, []);

    const updateProductStatus = async (id, status) => {
        try {
            const response = await axios.patch(`http://localhost:5000/products/${id}/status`, { status });
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
            const response = await axios.patch(`http://localhost:5000/products/${id}/featured`);
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
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-6">Product Review Queue</h1>
            {products.length === 0 ? (
                <p className="text-center text-gray-500">No products in the review queue.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2 border">Product Name</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{product.name}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => navigate(`/product-details/${product._id}`)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded mr-2 hover:bg-blue-600"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => makeFeatured(product._id)}
                                        disabled={product.featured}
                                        className={`px-4 py-1 rounded mr-2 ${product.featured
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-green-500 text-white hover:bg-green-600'
                                            }`}
                                    >
                                        {product.featured ? 'Featured' : 'Make Featured'}
                                    </button>
                                    <button
                                        onClick={() => updateProductStatus(product._id, 'Accepted')}
                                        disabled={product.status === 'Accepted'}
                                        className={`px-4 py-1 rounded mr-2 ${product.status === 'Accepted'
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-green-500 text-white hover:bg-green-600'
                                            }`}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => updateProductStatus(product._id, 'Rejected')}
                                        disabled={product.status === 'Rejected'}
                                        className={`px-4 py-1 rounded ${product.status === 'Rejected'
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-red-500 text-white hover:bg-red-600'
                                            }`}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReviewQueue;
