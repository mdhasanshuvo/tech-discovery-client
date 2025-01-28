import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FiThumbsUp, FiFlag, FiCheckCircle } from "react-icons/fi";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [newReview, setNewReview] = useState({ reviewDescription: "", rating: 0 });

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://product-hunt-server-five.vercel.app/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id,newReview]);

  // Handle voting (upvote/downvote)
  const handleVoteToggle = async () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Please login first!',
        text: 'You need to be logged in to vote.',
      });
      return;
    }

    // Prevent voting on your own product
    if (product.owner.email === user?.email) {
      Swal.fire({
        icon: 'error',
        title: 'You cannot vote on your own product!',
        text: 'Voting on a product you created is not allowed.',
      });
      return;
    }

    // Ensure the voters array exists and handle vote toggle
    const voters = product.voters || [];
    const isAlreadyVoted = voters.includes(user?.email);

    try {
      if (isAlreadyVoted) {
        // Send a downvote request
        await axios.patch(`https://product-hunt-server-five.vercel.app/products/${id}/downvote`, {
          userEmail: user?.email,
        });
        Swal.fire({
          icon: 'success',
          title: 'Your vote was removed!',
          text: 'You have successfully removed your vote.',
        });

        // Update the product state
        setProduct((prevProduct) => ({
          ...prevProduct,
          votes: prevProduct.votes - 1,
          voters: voters.filter((email) => email !== user?.email),
        }));
      } else {
        // Send an upvote request
        await axios.patch(`https://product-hunt-server-five.vercel.app/products/${id}/upvote`, {
          userEmail: user?.email,
        });
        Swal.fire({
          icon: 'success',
          title: 'Your vote was added!',
          text: 'You have successfully upvoted this product.',
        });

        // Update the product state
        setProduct((prevProduct) => ({
          ...prevProduct,
          votes: (prevProduct.votes || 0) + 1, // Handle cases where votes might be undefined
          voters: [...voters, user?.email],
        }));
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



  // Handle reporting
  const handleReport = async () => {
    if (!user) {
      Swal.fire("Please login to report!", "", "warning");
      return;
    }

    try {
      const reason = await Swal.fire({
        title: "Report Product",
        input: "textarea",
        inputPlaceholder: "Enter your reason for reporting this product...",
        showCancelButton: true,
      });

      if (reason.isConfirmed && reason.value) {
        await axios.patch(`https://product-hunt-server-five.vercel.app/products/${id}/report`, {
          userEmail: user.email,
          reportReason: reason.value,
        });
        Swal.fire("Reported", "Product has been reported!", "success");
      }
    } catch (error) {
      console.error("Error reporting product:", error);
      Swal.fire("Error", "Something went wrong while reporting.", "error");
    }
  };

  // Handle submitting a review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.reviewDescription || !newReview.rating) {
      Swal.fire("Error", "Please fill out all fields.", "error");
      return;
    }

    try {
      const response = await axios.patch(`https://product-hunt-server-five.vercel.app/products/${id}/review`, {
        reviewerName: user.displayName,
        reviewerImage: user.photoURL,
        userEmail: user.email,
        ...newReview,
      });

      if (response.data) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          reviews: response.data.reviews,
        }));
        setNewReview({ reviewDescription: "", rating: 0 });
        Swal.fire("Success", "Review added successfully!", "success");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire("Error", "Something went wrong while submitting the review.", "error");
    }
  };

  if (!product) return <div>Loading...</div>;

  const isOwner = product.owner.email === user?.email;

  return (
    <div className="container mx-auto px-4 py-12 sm:pb-16">
      {/* Product Information */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-lg"
        />

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-500 mb-4">
            <strong>Tags:</strong>{" "}
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium rounded-full mr-2"
              >
                {tag.text}
              </span>
            ))}
          </p>
          <Link
            target="_blank"
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
            to={`${product?.externalLink}`}
          >
            Visit Product
          </Link>

          {/* Actions: Vote and Report */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={handleVoteToggle}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-transform ${isOwner
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                }`}
              disabled={isOwner}
            >
              {product?.voters?.includes(user?.email) ? <FiCheckCircle /> : <FiThumbsUp />}
              {product.votes || 0}
            </button>
            {isOwner ? (
              <div className="flex items-center gap-2 px-6 py-3 bg-gray-400 text-gray-700 rounded-lg shadow-md">
                <FiFlag size={20} />
                <span>You cannot report your own product</span>
              </div>
            ) : (
              <button
                onClick={handleReport}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-transform hover:scale-105"
              >
                <FiFlag size={20} />
                Report
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Reviews</h2>
        <div className="grid gap-6">
          {product.reviews?.length ? (
            product.reviews.map((review, index) => (
              <div
                key={index}
                className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.reviewerImage || "/default-avatar.png"}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full shadow-sm"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {review.reviewerName}
                  </h3>
                </div>
                <p className="text-gray-700 mb-3">{review.reviewDescription}</p>
                <div className="flex items-center gap-1">
                  <Rating
                    initialRating={review.rating}
                    readonly
                    emptySymbol={<FaRegStar className="text-gray-300" />}
                    fullSymbol={<FaStar className="text-yellow-400" />}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Post a Review */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Post a Review</h2>
        {isOwner ? (
          <div className="p-4 bg-gray-100 border rounded-lg">
            <p className="text-gray-600">You cannot add a review to your own product.</p>
          </div>
        ) : (
          <form onSubmit={handleReviewSubmit} className="grid gap-6">
            <textarea
              value={newReview.reviewDescription}
              onChange={(e) =>
                setNewReview({ ...newReview, reviewDescription: e.target.value })
              }
              placeholder="Write your review..."
              className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            ></textarea>
            <Rating
              onChange={(value) => setNewReview({ ...newReview, rating: value })}
              initialRating={newReview.rating}
              emptySymbol={<FaRegStar className="text-gray-300" />}
              fullSymbol={<FaStar className="text-yellow-400" />}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-transform hover:scale-105"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );

};

export default ProductDetails;
