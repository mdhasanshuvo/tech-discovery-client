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
                    `http://localhost:5000/user/eligibility?email=${user?.email}`
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
            const response = await axios.post("http://localhost:5000/products", {
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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Add a New Product</h2>

            {!canAddProduct && (
                <div className="text-red-600 mb-4">
                    You have reached the product limit. Purchase a membership subscription to add more products.
                </div>
            )}

            <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
                className="w-full mb-4 p-2 border rounded"
                disabled={!canAddProduct}
            />

            <input
                type="url"
                name="image"
                value={productData.image}
                onChange={handleChange}
                placeholder="Image URL"
                required
                className="w-full mb-4 p-2 border rounded"
                disabled={!canAddProduct}
            />

            <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full mb-4 p-2 border rounded"
                disabled={!canAddProduct}
            ></textarea>

            <ReactTags
                tags={productData.tags}
                handleDelete={(i) => handleTagsChange(productData.tags.filter((_, index) => index !== i))}
                handleAddition={(tag) => handleTagsChange([...productData.tags, tag])}
                placeholder="Add tags"
                readOnly={!canAddProduct}
            />

            <input
                type="url"
                name="externalLink"
                value={productData.externalLink}
                onChange={handleChange}
                placeholder="External Link"
                required
                className="w-full mb-4 p-2 border rounded"
                disabled={!canAddProduct}
            />

            <button
                type="submit"
                className={`w-full p-2 rounded ${canAddProduct ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-gray-700"
                    }`}
                disabled={!canAddProduct}
            >
                Submit
            </button>
        </form>
    );
};

export default AddProduct;
