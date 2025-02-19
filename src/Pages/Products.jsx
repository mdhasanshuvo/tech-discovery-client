import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FiThumbsUp, FiCheckCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isTopRated, setIsTopRated] = useState(false); // State to toggle top-rated filter
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'https://product-hunt-server-five.vercel.app/product';
        if (isTopRated) {
          url = 'http://localhost:5000/alltrending'; // Fetch top-rated products
        }
        const response = await axios.get(url, {
          params: { page, search },
        });
        setProducts(response.data.products || response.data); // Handle different responses
        setTotalPages(response.data.totalPages || 1); // Handle pagination for all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [page, search, isTopRated]); // Re-fetch products when the filter changes

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

    // Ensure voters array exists and is initialized
    const voters = product.voters || [];
    const isAlreadyVoted = voters.includes(user?.email);

    try {
      if (isAlreadyVoted) {
        // Send a downvote request (remove vote)
        await axios.patch(`https://product-hunt-server-five.vercel.app/products/${id}/downvote`, {
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
                voters: voters.filter((email) => email !== user?.email),
              }
              : product
          )
        );
      } else {
        // Send an upvote request (add vote)
        await axios.patch(`https://product-hunt-server-five.vercel.app/products/${id}/upvote`, {
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
                votes: (product.votes || 0) + 1, // Ensure votes is a number
                voters: [...voters, user?.email],
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

  const handleProductDetails = (id) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please login first!",
        text: "You need to be logged in to vote.",
      });
      return navigate("/auth/login");
    }
    navigate(`/product-details/${id}`);
  };

  // Handle toggle for top-rated filter
  const handleTopRatedToggle = () => {
    setIsTopRated((prev) => !prev);
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:pb-16 lg:pb-24">
      <Helmet>
        <title>Products | Tech Discovery</title>
      </Helmet>
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Explore All Products
      </h1>

      {/* Search Input */}
      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by tags..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Top Rated Filter Toggle */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleTopRatedToggle}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isTopRated ? 'Show All Products' : 'Show Top Rated Products'}
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 bg-white"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            {/* Product Details */}
            <div className="p-4">
              <h2
                onClick={() => handleProductDetails(product._id)}
                className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
              >
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-2 py-1">
                {product.description.length > 50
                  ? product.description.slice(0, 50) + "..."
                  : product.description}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Tags:{" "}
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full mr-2"
                  >
                    {tag.text}
                  </span>
                ))}
              </p>
              <button
                onClick={() => handleVoteToggle(product._id)}
                className={`flex items-center justify-center gap-2 mt-4 px-5 py-2 rounded-lg text-sm font-medium transition-transform transform hover:scale-105 ${product.owner.email === user?.email
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
              >
                {product?.voters?.includes(user?.email) ? (
                  <FiCheckCircle className="text-lg text-green-500" />
                ) : (
                  <FiThumbsUp className="text-lg" />
                )}
                {product.votes || 0}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg transition-all ${page === pageNum
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
