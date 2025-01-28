import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { WithContext as ReactTags } from "react-tag-input";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: "",
        image: "",
        description: "",
        tags: [],
        externalLink: "",
    });
    const [canAddProduct, setCanAddProduct] = useState(false);

    // Check eligibility to add a product
    useEffect(() => {
        const fetchEligibility = async () => {
            try {
                const response = await axios.get(
                    `https://product-hunt-server-five.vercel.app/user/eligibility?email=${user?.email}`
                );
                setCanAddProduct(response.data.canAddProduct);
            } catch (error) {
                console.error("Error fetching eligibility:", error);
            }
        };

        if (user?.email) {
            fetchEligibility();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleTagsChange = (tags) => {
        setProductData({ ...productData, tags });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the user can add a product
        if (!canAddProduct) {
            Swal.fire(
                "Upgrade Required",
                "You can only add more products after purchasing a membership subscription.",
                "warning"
            );
            return;
        }

        // Log the product data for debugging
        console.log("Product Data:", productData);

        try {
            const response = await axios.post("https://product-hunt-server-five.vercel.app/products", {
                ...productData,
                owner: {
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL,
                },
            });

            // Check if the product was added successfully (status 201 for creation)
            if (response.status === 201) {
                Swal.fire("Success!", "Product added successfully!", "success");
                setProductData({ name: "", image: "", description: "", tags: [], externalLink: "" });
                navigate("/dashboard/my-products");
            } else {
                Swal.fire("Error!", "Failed to add product. Please try again.", "error");
            }
        } catch (error) {
            // Log the error to understand what went wrong
            console.error("Error adding product:", error);
            Swal.fire("Error!", "Failed to add product. Please try again.", "error");
        }
    };



    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Add a New Product</h2>

                {!canAddProduct && (
                    <div className="text-red-600 mb-4">
                        You have reached the product limit. Purchase a membership subscription to add more products.
                    </div>
                )}

                {/* Product Name Field */}
                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    disabled={!canAddProduct}
                />

                {/* Product Image Input */}
                <input
                    type="url"
                    name="image"
                    value={productData.image}
                    onChange={handleChange}
                    placeholder="Product Image URL"
                    required
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    disabled={!canAddProduct}
                />

                {/* Description Field */}
                <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    placeholder="Product Description"
                    required
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    disabled={!canAddProduct}
                ></textarea>

                {/* Product Owner Info */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-4">Product Owner Information</h3>
                    <div className="mb-2">
                        <label className="block text-gray-700">Owner Name:</label>
                        <input
                            type="text"
                            value={user?.displayName || 'N/A'}
                            disabled
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Owner Email:</label>
                        <input
                            type="email"
                            value={user?.email || 'N/A'}
                            disabled
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Owner Image:</label>
                        <img
                            src={user?.photoURL || "https://via.placeholder.com/150"}
                            alt="Owner"
                            className="w-16 h-16 rounded-full border-2 border-gray-300 mb-2"
                        />
                    </div>
                </div>

                {/* Tags Input */}
                <div className="mb-4">
                    <ReactTags
                        tags={productData.tags}
                        handleDelete={(i) => handleTagsChange(productData.tags.filter((_, index) => index !== i))}
                        handleAddition={(tag) => handleTagsChange([...productData.tags, tag])}
                        placeholder="Add tags (e.g., tech, gadget, etc.)"
                        readOnly={!canAddProduct}
                    />
                </div>

                {/* External Link Field */}
                <input
                    type="url"
                    name="externalLink"
                    value={productData.externalLink}
                    onChange={handleChange}
                    placeholder="External Link (Website or Landing Page)"
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    disabled={!canAddProduct}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full p-3 rounded-lg text-white ${canAddProduct ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
                    disabled={!canAddProduct}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
