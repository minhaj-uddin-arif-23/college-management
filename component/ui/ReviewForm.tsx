"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  collegeId: string;
  collegeName: string;
  userId: string;
}

export default function ReviewForm({ collegeId, collegeName, userId }: Props) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const reviewData = {
      collegeId,
      collegeName,
      userId,
      reviewText: review,
      rating: parseInt(rating),
    };

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    if (res.ok) {
      toast.success("Review submitted!");
      setReview("");
      setRating("");
    } else {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <textarea
        name="review"
        placeholder="Write your review"
        required
        className="textarea textarea-bordered w-full"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <select
        name="rating"
        required
        className="select select-bordered w-full"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="">Select rating</option>
        <option value="5">5 - Excellent</option>
        <option value="4">4 - Good</option>
        <option value="3">3 - Average</option>
        <option value="2">2 - Poor</option>
        <option value="1">1 - Bad</option>
      </select>

      <button type="submit" className="btn btn-primary w-full">
        Submit Review
      </button>
    </form>
  );
}
