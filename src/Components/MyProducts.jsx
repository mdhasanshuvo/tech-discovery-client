import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products', {
                    params: { email: user.email },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                Swal.fire('Error', 'Failed to fetch products', 'error');
            }
        };

        if (user?.email) {
            fetchProducts();
        }
    }, [user]);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete the product permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/products/${id}`);
                setProducts(products.filter((product) => product._id !== id));
                Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting product:', error);
                Swal.fire('Error', 'Failed to delete product', 'error');
            }
        }
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/products/${selectedProduct._id}`, selectedProduct);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === selectedProduct._id ? { ...product, ...selectedProduct } : product
                )
            );
            Swal.fire('Updated!', 'Your product has been updated.', 'success');
            handleModalClose();
        } catch (error) {
            console.error('Error updating product:', error);
            Swal.fire('Error', 'Failed to update product', 'error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-6">My Products</h1>
            {products.length === 0 ? (
                <p className="text-center text-gray-500">No products found.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2 border">Product Name</th>
                            <th className="px-4 py-2 border">Number of Votes</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{product.name}</td>
                                <td className="px-4 py-2 border">{product.votes || 0}</td>
                                <td className="px-4 py-2 border">{product.status || 'Pending'}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => openModal(product)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded mr-2 hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Update Product</h2>
                        <label className="block mb-2">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={selectedProduct.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </label>
                        <label className="block mb-2">
                            Description:
                            <textarea
                                name="description"
                                value={selectedProduct.description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            ></textarea>
                        </label>
                        <label className="block mb-2">
                            External Link:
                            <input
                                type="text"
                                name="externalLink"
                                value={selectedProduct.externalLink}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </label>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleModalClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProducts;
