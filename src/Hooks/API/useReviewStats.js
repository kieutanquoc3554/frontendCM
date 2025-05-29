import axios from "axios";
import { useEffect, useState } from "react";

export default function useReviewStats({ product }) {
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const fetchReviewStats = async () => {
    try {
      const response = await axios.get(
        `https://backendlvtn.onrender.com/reviews/stats?productId=${product._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );
      console.log("data: ", response.data);

      setTotalReviews(response.data.totalReviews);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Failed to fetch review stats:", error);
    }
  };

  useEffect(() => {
    fetchReviewStats();
  }, [product._id]);

  return { fetchReviewStats, totalReviews, averageRating };
}
