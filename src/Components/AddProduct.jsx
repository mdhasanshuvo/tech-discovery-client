import { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import { WithContext as ReactTags } from 'react-tag-input';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: '',
        image: '',
        description: '',
        tags: [],
        externalLink: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleTagsChange = (tags) => {
        setProductData({ ...productData, tags });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/products', {
                ...productData,
                ownerName: user?.displayName,
                ownerEmail: user?.email,
                ownerImage: user?.photoURL,
            });
            if (response.status === 201) {
                Swal.fire('Success!', 'Product added successfully!', 'success');
                setProductData({ name: '', image: '', description: '', tags: [], externalLink: '' });
                navigate('/dashboard/my-products')
            }
        } catch (error) {
            Swal.fire('Error!', 'Failed to add product. Please try again.', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Add a New Product</h2>
            
            {/* Product Name */}
            <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
                className="w-full mb-4 p-2 border rounded"
            />
            
            {/* Product Image */}
            <input
                type="url"
                name="image"
                value={productData.image}
                onChange={handleChange}
                placeholder="Image URL"
                required
                className="w-full mb-4 p-2 border rounded"
            />

            {/* Product Description */}
            <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full mb-4 p-2 border rounded"
            ></textarea>
            
            {/* Tags (React Tags input) */}
            <ReactTags 
                tags={productData.tags}
                handleDelete={(i) => handleTagsChange(productData.tags.filter((tag, index) => index !== i))}
                handleAddition={(tag) => handleTagsChange([...productData.tags, tag])}
                placeholder="Add tags"
            />

            {/* External Link */}
            <input
                type="url"
                name="externalLink"
                value={productData.externalLink}
                onChange={handleChange}
                placeholder="External Link"
                required
                className="w-full mb-4 p-2 border rounded"
            />

            {/* Owner Info (Disabled and taken from context) */}
            <div className="mb-4">
                <label className="block">Owner Name: </label>
                <input
                    type="text"
                    value={user?.displayName || ''}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100"
                />
            </div>

            <div className="mb-4">
                <label className="block">Owner Email: </label>
                <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100"
                />
            </div>

            <div className="mb-4">
                <label className="block">Owner Image: </label>
                <input
                    type="text"
                    value={user?.photoURL || ''}
                    disabled
                    className="w-full p-2 border rounded bg-gray-100"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
};

export default AddProduct;
