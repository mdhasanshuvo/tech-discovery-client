import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FiThumbsUp, FiFlag } from "react-icons/fi";
import Rating from "react-rating"; // Import the rating component
import { FaStar, FaRegStar } from "react-icons/fa"; // Star icons for the rating component

const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState([]);
    const [newReview, setNewReview] = useState({ reviewDescription: "", rating: 0 });

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
    }, [id,product]);

    const handleUpvote = async () => {
        if (!user) {
            Swal.fire("Please login to vote!", "", "warning");
            return;
        }

        const isAlreadyVoted = product.voters.includes(user.email);
        const updatedVoters = isAlreadyVoted
            ? product.voters.filter(email => email !== user.email)
            : [...product.voters, user.email];

        const updatedProduct = {
            ...product,
            voters: updatedVoters,
            votes: updatedVoters.length,
        };

        // Optimistically update the product state
        setProduct(updatedProduct);

        try {
            const endpoint = `http://localhost:5000/products/${id}/${isAlreadyVoted ? "downvote" : "upvote"}`;
            const response = await axios.patch(endpoint, { userEmail: user.email });

            if (response.data) {
                // Re-fetch updated data if necessary
                setProduct(prevState => ({ ...prevState, ...response.data }));
            }

            Swal.fire("Success", `Vote ${isAlreadyVoted ? "removed" : "added"}!`, "success");
        } catch (error) {
            console.error("Error voting:", error);
            Swal.fire("Error", "Something went wrong while voting.", "error");
            setProduct(product); // Revert to previous state if there's an error
        }
    };

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
                // Optimistically update the state
                const updatedReports = [
                    ...(product.reports || []),
                    { userEmail: user.email, reason: reason.value },
                ];
                setProduct({ ...product, reports: updatedReports });

                const response = await axios.patch(`http://localhost:5000/products/${id}/report`, {
                    userEmail: user.email,
                    reportReason: reason.value,
                });

                if (response.data) {
                    // Update the state with backend response
                    setProduct(prevState => ({ ...prevState, ...response.data }));
                    Swal.fire("Reported", "Product has been reported!", "success");
                }
            }
        } catch (error) {
            console.error("Error reporting product:", error);
            Swal.fire("Error", "Something went wrong while reporting.", "error");
        }
    };



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
                setProduct(prevState => ({ ...prevState, ...response.data }));
                setNewReview({ reviewDescription: "", rating: 0 }); // Reset the review form
            }
            Swal.fire("Success", "Review added successfully!", "success");
        } catch (error) {
            console.error("Error submitting review:", error);
            Swal.fire("Error", "Something went wrong while submitting the review.", "error");
        }
    };


    if (!product) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-6">
                <img src={product.image} alt={product.name} className="w-full md:w-1/3 rounded shadow-lg" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                    <p className="mt-4 text-lg">{product.reviewDescription}</p>
                    <p className="mt-2 text-gray-500">Tags: {product.tags?.map(tag => tag.text).join(', ')}</p>

                    <div className="mt-4 flex items-center gap-6">
                        <button
                            onClick={handleUpvote}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                        >
                            <FiThumbsUp size={20} />
                            {product.votes} Votes
                        </button>
                        <button
                            onClick={handleReport}
                            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                        >
                            <FiFlag size={20} />
                            Report
                        </button>
                    </div>
                </div>
            </div>

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

            <div className="mt-10">
                <h2 className="text-2xl font-bold">Post a Review</h2>
                <form onSubmit={handleReviewSubmit} className="grid gap-6 mt-4">
                    <textarea
                        value={newReview.reviewDescription}
                        onChange={(e) => setNewReview({ ...newReview, reviewDescription: e.target.value })}
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
            </div>
        </div>
    );
};

export default ProductDetails;
