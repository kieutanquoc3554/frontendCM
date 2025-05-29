import { Icon } from "@iconify/react/dist/iconify.js";

const Heading = ({ orderInfo, generatePDF }) => {
  return (
    <>
      <Icon fontSize={"50px"} color="#12D76E" icon="mdi:tick-decagram" />
      <h1>Đặt hàng thành công</h1>
      <h3>Cảm ơn bạn vì đã tin dùng và mua sắm sản phẩm của chúng tôi</h3>
      <p>
        Chúng tôi đã gửi một email tự động đến địa chỉ:{" "}
        <strong>{orderInfo.email}</strong> để xác nhận đơn hàng của bạn.
      </p>
      <button className="involce" onClick={generatePDF}>
        Xuất hóa đơn PDF
      </button>
    </>
  );
};

export default Heading;
