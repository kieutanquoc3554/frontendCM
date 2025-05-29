import { Icon } from "@iconify/react/dist/iconify.js";

const ConfirmRight = ({ orderInfo }) => {
  return (
    <div className="confirm-right">
      <h4
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: "900",
          justifyContent: "right",
        }}
      >
        <Icon fontSize={"20px"} icon="carbon:delivery" />
        Thông tin giao hàng
      </h4>
      <p>
        Tên người nhận: <strong>{orderInfo.name}</strong>
      </p>
      <p>
        Địa chỉ: <strong>{orderInfo.address}</strong>
      </p>
      <p>
        Số điện thoại: <strong>{orderInfo.phone}</strong>
      </p>
    </div>
  );
};

export default ConfirmRight;
