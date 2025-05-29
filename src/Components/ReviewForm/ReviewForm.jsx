import axios from "axios";
import React, { useState } from "react";
import "./ReviewForm.css";
import { toast } from "react-toastify";

const ReviewForm = ({ productId, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("tk");
  const userId = localStorage.getItem("lfl");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backendlvtn.onrender.com/reviews/addReview",
        { productId, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onAddReview(response.data);
      setRating(0);
      setComment("");
      toast.success("Đánh giá sản phẩm thành công");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Đánh giá sản phẩm thất bại"
      );
    }
  };

  return (
    <form className="reviewForm" onSubmit={handleSubmit}>
      <h2>ĐÁNH GIÁ SẢN PHẨM</h2>
      <div className="starRating">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < rating ? "filled" : ""}`}
            onClick={() => setRating(index + 1)}
          >
            ★
          </span>
        ))}
      </div>
      <div>
        <label>Đánh giá</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
        />
      </div>
      <button type="submit">Gửi</button>
    </form>
  );
};

export default ReviewForm;
