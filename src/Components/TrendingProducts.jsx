import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { FiCheckCircle, FiThumbsUp } from "react-icons/fi";
import Swal from "sweetalert2";
import Slider from "react-slick"; // Import the slider library
import "slick-carousel/slick/slick.css"; // Slider styles
import "slick-carousel/slick/slick-theme.css";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [coupons, setCoupons] = useState([]); // State for coupons
  const { user } = useContext(AuthContext); // Get current user from context
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch trending products from the API
    const fetchTrendingProducts = async () => {
      try {
        const response = await axios.get("https://product-hunt-server-five.vercel.app/tproducts/trending");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching trending products:", error);
      }
    };

    // Fetch coupons from the API
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("https://product-hunt-server-five.vercel.app/valid");
        setCoupons(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchTrendingProducts();
    fetchCoupons();
  }, []);

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


  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <div className="container mx-auto px-4 pb-12 sm:pb-16 lg:pb-24">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-primary mt-6">
        Trending Products
      </h2>

      {/* Coupon Slider Section */}
      <div className="my-12">
        <Slider {...sliderSettings}>
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="p-8 bg-gradient-to-br from-green-100 to-green-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center flex flex-col items-center"
            >
              <h3 className="text-2xl font-bold text-green-900 mb-4">
                Use Code: <span className="underline">{coupon.code}</span>
              </h3>
              <p className="text-gray-700 text-sm italic mb-3">{coupon.description}</p>
              <p className="text-xl font-semibold text-green-900 mb-4">
                🎉 {coupon.discount}% Off
              </p>
              <div className="bg-white py-2 px-4 rounded-full shadow-md">
                <span className="text-sm font-medium text-gray-500">Expires on: </span>
                <span className="text-sm font-bold text-red-600">
                  {new Date(coupon.expiryDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Trending Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h2
                onClick={() => handleProductDetails(product._id)}
                className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors duration-300"
              >
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm line-clamp-2">
                {product.description.length > 50
                  ? product.description.slice(0, 50) + "..."
                  : product.description}
              </p>
              <div className="flex flex-wrap gap-2 my-3">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleVoteToggle(product._id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-transform transform hover:scale-105 ${product.owner.email === user?.email
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  {product.voters?.includes(user?.email) ? (
                    <FiCheckCircle className="text-lg text-green-500" />
                  ) : (
                    <FiThumbsUp className="text-lg" />
                  )}
                  {product.votes || 0}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default TrendingProducts;
