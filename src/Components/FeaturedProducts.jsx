import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { FiCheckCircle, FiThumbsUp } from "react-icons/fi";
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://product-hunt-server-five.vercel.app/f-products/featured"
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleVoteToggle = async (id) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please login first!",
        text: "You need to be logged in to vote.",
      });
      return navigate("/auth/login");
    }

    const product = products.find((prod) => prod._id === id);

    if (product.owner.email === user?.email) {
      return Swal.fire({
        icon: "error",
        title: "You cannot vote on your own product!",
        text: "Voting on a product you created is not allowed.",
      });
    }

    const voters = product.voters || [];
    const isAlreadyVoted = voters.includes(user?.email);
    const voteAction = isAlreadyVoted ? "downvote" : "upvote";
    const voteChange = isAlreadyVoted ? -1 : 1;

    try {
      await axios.patch(
        `https://product-hunt-server-five.vercel.app/products/${id}/${voteAction}`,
        { userEmail: user?.email }
      );

      Swal.fire({
        icon: "success",
        title: `Your vote was ${isAlreadyVoted ? "removed" : "added"}!`,
        text: `You have successfully ${isAlreadyVoted ? "removed your vote" : "upvoted this product"}.`,
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id
            ? {
              ...product,
              votes: (product.votes || 0) + voteChange,
              voters: isAlreadyVoted
                ? voters.filter((email) => email !== user?.email)
                : [...voters, user?.email],
            }
            : product
        )
      );
    } catch (error) {
      console.error("Error updating vote:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error while processing your vote.",
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
    navigate(`/product-details/${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-primary mb-10"> Featured Products </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 bg-white"
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform transform hover:scale-110 duration-300"
                />
              </div>
              <div className="p-6 space-y-3">
                <h2
                  onClick={() => handleProductDetails(product._id)}
                  className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 hover:underline transition"
                >
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {product.description.length > 30
                    ? product.description.slice(0, 30) + "..."
                    : product.description}
                </p>
                <div className="flex justify-center">
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200 transition"
                      >
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => handleVoteToggle(product._id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-transform transform duration-200 font-semibold ${product.owner.email === user?.email
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                      }`}
                  >
                    {product.voters?.includes(user?.email) ? (
                      <FiCheckCircle className="text-green-500" />
                    ) : (
                      <FiThumbsUp />
                    )}
                    <span>{product.votes || 0}</span>
                  </button>
                  <button
                    onClick={() => handleProductDetails(product._id)}
                    className="px-4 py-2 text-sm font-semibold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    See More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
