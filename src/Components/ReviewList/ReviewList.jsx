import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ReviewList.css";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("tk");
  const userId = localStorage.getItem("lfl");
  const [expandedReviewIds, setExpandedReviewIds] = useState([]);
  const [replyComment, setReplyComment] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://backendlvtn.onrender.com/reviews/getReview`,
          {
            params: { productId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleExpand = (id) => {
    setExpandedReviewIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
  };

  const handleSubmitReply = async (reviewId) => {
    try {
      const response = await axios.post(
        "https://backendlvtn.onrender.com/reviews/addReply",
        {
          reviewId,
          comment: replyComment,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews((prevReviews) =>
        prevReviews.map((r) =>
          r._id === reviewId
            ? { ...r, replies: [...r.replies, response.data] }
            : r
        )
      );
      setReplyComment("");
    } catch (error) {
      console.error("Failed to add reply:", error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(
        `https://backendlvtn.onrender.com/reviews/deleteReview/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(reviews.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  return (
    <div className="reviewList">
      <h3>CÁC ĐÁNH GIÁ SẢN PHẨM</h3>
      {reviews.map((review) => (
        <div key={review._id} className="reviewItem">
          <p>
            <strong>Tên người đánh giá:</strong>{" "}
            {review.userId ? review.userId.name : "Người dùng không xác định"}
            {review.hasPurchased ? (
              <span className="purchasedLabel">Xác nhận đã mua hàng</span>
            ) : (
              <span className="purchasedLabelFalse">Chưa mua</span>
            )}
          </p>
          <p>
            <strong>Điểm:</strong> {renderStars(review.rating)}
          </p>
          <p>
            <strong>Đánh giá:</strong> {review.comment}
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {review.userId._id === userId && (
              <button
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => handleDeleteReview(review._id)}
              >
                Xoá
              </button>
            )}
            <button onClick={() => handleExpand(review._id)}>
              {expandedReviewIds.includes(review._id)
                ? "Ẩn câu trả lời"
                : "Xem câu trả lời"}
            </button>
          </div>
          {expandedReviewIds.includes(review._id) && (
            <div className={`replySection show`}>
              <h4>Câu trả lời:</h4>
              <textarea
                value={replyComment}
                onChange={(e) => setReplyComment(e.target.value)}
                placeholder="Nhập câu trả lời..."
              />
              <button onClick={() => handleSubmitReply(review._id)}>Gửi</button>
              <div className="replies">
                {review.replies &&
                  review.replies.map((reply) => (
                    <div key={reply._id} className="replyItem">
                      <p>
                        <strong>
                          {reply.userId
                            ? reply.userId.name
                            : "Người dùng không xác định"}
                          :
                        </strong>{" "}
                        {reply.comment}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
