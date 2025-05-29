import React, { useEffect } from "react";
import "./Success.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import usePayment from "../../Hooks/API/usePayment";
import GenerateBillSuccess from "../../Utils/GenerateBillSuccess";
import Heading from "./Heading";
import Information from "./Information";

const Success = ({ orderInfo }) => {
  const { fetchPaymentMethodName, paymentMethodName } = usePayment();
  const { generatePDF } = GenerateBillSuccess({ orderInfo, paymentMethodName });

  useEffect(() => {
    if (orderInfo.paymentMethod) {
      fetchPaymentMethodName(orderInfo.paymentMethod);
    }
  }, [orderInfo.paymentMethod]);

  return (
    <div className="confirm-container">
      <Heading orderInfo={orderInfo} generatePDF={generatePDF} />
      <Information
        orderInfo={orderInfo}
        paymentMethodName={paymentMethodName}
      />
    </div>
  );
};

export default Success;
