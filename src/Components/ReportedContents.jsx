import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ReportedContents = () => {
    const [reportedProducts, setReportedProducts] = useState([]);
    const navigate = useNavigate();

    // Fetch reported products
    useEffect(() => {
        const fetchReportedProducts = async () => {
            try {
                const response = await axios.get("https://product-hunt-server-five.vercel.app/reported-products");
                setReportedProducts(response.data);
            } catch (error) {
                console.error("Error fetching reported products:", error);
            }
        };

        fetchReportedProducts();
    }, [reportedProducts]);

    // Handle delete product
    const handleDelete = async (productId) => {
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirmDelete.isConfirmed) {
            try {
                await axios.delete(`https://product-hunt-server-five.vercel.app/products/${productId}`);
                Swal.fire("Deleted!", "The product has been deleted.", "success");

                // Remove the product from the state
                setReportedProducts((prev) => prev.filter((product) => product.id !== productId));
            } catch (error) {
                console.error("Error deleting product:", error);
                Swal.fire("Error", "Something went wrong while deleting the product.", "error");
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Reported Contents</h1>

            {reportedProducts.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2 text-left">Product Name</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportedProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{product.name}</td>
                                <td className="border px-4 py-2 flex justify-center gap-4">
                                    <button
                                        onClick={() => navigate(`/product-details/${product._id}`)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500">No reported products available.</p>
            )}
        </div>
    );
};

export default ReportedContents;