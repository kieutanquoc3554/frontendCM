import { Icon } from "@iconify/react/dist/iconify.js";

const ConfirmLeft = ({ orderInfo, paymentMethodName }) => {
  return (
    <div className="confirm-left">
      <h4
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: "900",
        }}
      >
        <Icon
          fontSize={"20px"}
          icon="material-symbols-light:order-approve-outline"
        />
        Thông tin đơn hàng
      </h4>
      <p>
        Mã đơn hàng: <strong>{orderInfo._id}</strong>
      </p>
      <p>
        Thời gian đặt hàng: <strong>{orderInfo.order_date}</strong>
      </p>
      <p>
        Hình thức thanh toán: <strong>{paymentMethodName}</strong>
      </p>
      <p>
        Phí vận chuyển: <strong>{orderInfo.shipping_fee}</strong>
      </p>
      {paymentMethodName === "Thanh toán bằng tiền mặt" ? (
        <p>
          Số tiền cần thanh toán: <strong>{orderInfo.total}</strong>
        </p>
      ) : (
        <p>
          Số tiền đã thanh toán: <strong>{orderInfo.total}</strong>
        </p>
      )}
      <h4 style={{ fontWeight: "900", marginTop: "20px" }}>Sản phẩm đã đặt</h4>
      <div className="product-list">
        {orderInfo.orders &&
          Array.isArray(orderInfo.orders) &&
          orderInfo.orders.map((product, index) => (
            <div key={index} className="product-item">
              <p>
                <strong>Tên sản phẩm:</strong> {product.name}
              </p>
              <p>
                <strong>Số lượng:</strong> {product.quantity}
              </p>
              <p>
                <strong>Giá sản phẩm:</strong> {product.price}
              </p>
              <p>
                <strong>Tổng giá sản phẩm: </strong>
                {product.price * product.quantity}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ConfirmLeft;
