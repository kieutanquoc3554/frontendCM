import React from "react";
import "./Fail.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const Fail = () => {
  const handleRetryPayment = () => {
    window.location.reload();
  };
  return (
    <div className="confirm-container">
      <Icon fontSize={"50px"} color="red" icon="ic:round-cancel" />
      <h1>Đặt hàng & thanh toán chưa thành công</h1>
      <h3>Đã xảy ra sự cố hoặc lỗi được thông báo từ đối tác thanh toán</h3>
      <div className="repayment">
        <p>Thanh toán lại tại đây: </p>
        <button className="involce" onClick={handleRetryPayment}>
          Thanh toán lại
        </button>
      </div>
    </div>
  );
};

export default Fail;
