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
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                setProduct(response.data.product);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    // Handle voting (upvote/downvote)
    const handleVoteToggle = async () => {
        if (product.owner.email === user?.email) {
            Swal.fire({
                icon: "error",
                title: "You cannot vote on your own product!",
                text: "Voting on a product you created is not allowed.",
            });
            return;
        }

        const isAlreadyVoted = product.voters?.includes(user?.email);

        try {
            if (isAlreadyVoted) {
                await axios.patch(`http://localhost:5000/products/${id}/downvote`, {
                    userEmail: user?.email,
                });
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    votes: prevProduct.votes - 1,
                    voters: prevProduct.voters.filter((email) => email !== user?.email),
                }));
                Swal.fire("Your vote was removed!", "", "success");
            } else {
                await axios.patch(`http://localhost:5000/products/${id}/upvote`, {
                    userEmail: user?.email,
                });
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    votes: prevProduct.votes + 1,
                    voters: [...prevProduct.voters, user?.email],
                }));
                Swal.fire("Your vote was added!", "", "success");
            }
        } catch (error) {
            console.error("Error updating vote:", error);
            Swal.fire("Error", "Something went wrong while processing your vote.", "error");
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
                await axios.patch(`http://localhost:5000/products/${id}/report`, {
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
            const response = await axios.patch(`http://localhost:5000/products/${id}/review`, {
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
        <div className="container mx-auto px-4 py-6">
            {/* Product Information */}
            <div className="flex flex-col md:flex-row gap-6">
                <img src={product.image} alt={product.name} className="w-full md:w-1/3 rounded shadow-lg" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                    <p className="mt-4 text-lg">{product.description}</p>
                    <p className="my-2 text-gray-500">
                        Tags: {product.tags.map((tag) => tag.text).join(", ")}
                    </p>
                    <Link
                        target="_blank"
                        className="my-1 text-blue-400 py-1 underline"
                        to={`${product?.externalLink}`}
                    >
                        Visit Product
                    </Link>

                    {/* Actions: Vote and Report */}
                    <div className="mt-4 flex items-center gap-6">
                        <button
                            onClick={handleVoteToggle}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded ${
                                isOwner
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
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
                                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                            >
                                <FiFlag size={20} />
                                Report
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <div className="grid gap-6 mt-6">
                    {product.reviews?.length ? (
                        product.reviews.map((review, index) => (
                            <div key={index} className="p-6 border rounded-lg shadow-lg bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={review.reviewerImage || "/default-avatar.png"}
                                        alt={review.reviewerName}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <h3 className="font-semibold text-xl">{review.reviewerName}</h3>
                                </div>
                                <p className="mt-4">{review.reviewDescription}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <Rating
                                        initialRating={review.rating}
                                        readonly
                                        emptySymbol={<FaRegStar className="text-gray-400" />}
                                        fullSymbol={<FaStar className="text-yellow-400" />}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            </div>

            {/* Post Review */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold">Post a Review</h2>
                {isOwner ? (
                    <div className="p-4 bg-gray-100 border rounded-md">
                        <p className="text-gray-600">You cannot add a review to your own product.</p>
                    </div>
                ) : (
                    <form onSubmit={handleReviewSubmit} className="grid gap-6 mt-4">
                        <textarea
                            value={newReview.reviewDescription}
                            onChange={(e) =>
                                setNewReview({ ...newReview, reviewDescription: e.target.value })
                            }
                            placeholder="Write your review..."
                            className="p-4 border rounded-lg shadow-md"
                            required
                        ></textarea>
                        <Rating
                            onChange={(value) => setNewReview({ ...newReview, rating: value })}
                            initialRating={newReview.rating}
                            emptySymbol={<FaRegStar className="text-gray-400" />}
                            fullSymbol={<FaStar className="text-yellow-400" />}
                        />
                        <button
                            type="submit"
                            className="p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
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
