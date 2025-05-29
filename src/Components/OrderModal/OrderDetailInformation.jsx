import moment from "moment";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Table } from "antd";

const OrderDetailInformation = ({ selectedOrder, DetailOrderColumn }) => {
  const { formatCurrency } = useContext(ShopContext);
  return (
    <div>
      <p>
        <strong>Mã đơn hàng:</strong> {selectedOrder._id}
      </p>
      <p>
        <strong>Tên khách hàng:</strong> {selectedOrder.name}
      </p>
      <p>
        <strong>Ngày đặt:</strong>{" "}
        {moment.utc(selectedOrder.order_date).format("DD/MM/YYYY hh:mm")}
      </p>
      <p>
        <strong>Địa chỉ giao hàng:</strong> {selectedOrder.address}
      </p>
      <p>
        <strong>Tổng tiền:</strong> {formatCurrency(selectedOrder.total)}
      </p>
      <p>
        <strong>Khuyến mãi: </strong>
        {selectedOrder.promotionId?.name || "Không có khuyến mãi"}
      </p>
      <Table
        dataSource={selectedOrder.orders}
        columns={DetailOrderColumn()}
        rowKey="productId"
        pagination={false}
      />
    </div>
  );
};

export default OrderDetailInformation;
