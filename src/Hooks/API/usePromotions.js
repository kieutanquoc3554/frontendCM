import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function usePromotions({ getTotalCartAmount, selectedPayment }) {
  const [availablePromotions, setAvailablePromotions] = useState([]);
  const getApplicablePromotions = async () => {
    try {
      const response = await axios.post(
        "https://backendlvtn.onrender.com/promotions/applicable",
        {
          purchaseAmount: getTotalCartAmount(),
          paymentMethod: selectedPayment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );

      setAvailablePromotions(response.data);
    } catch (error) {
      toast.error(
        error.response?.data.message ||
          "Có lỗi xảy ra khi lấy danh sách khuyến mãi."
      );
    }
  };
  return { availablePromotions, getApplicablePromotions };
}
