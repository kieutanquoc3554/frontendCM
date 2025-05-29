import axios from "axios";
import { useState } from "react";

export default function usePayment() {
  const [paymentMethodName, setPaymentMethodName] = useState("");
  const fetchPaymentMethodName = async (name) => {
    const response = await axios.get(
      `https://backendlvtn.onrender.com/payments/get/${name}`
    );
    if (response.data.name === "cash") {
      setPaymentMethodName("Thanh toán bằng tiền mặt");
    } else {
      setPaymentMethodName("Thanh toán trực tuyến");
    }
  };
  return { paymentMethodName, fetchPaymentMethodName };
}
