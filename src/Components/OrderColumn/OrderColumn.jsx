import moment from "moment";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Button, Tag } from "antd";

const OrderColumn = ({ renderStatus, showOrderDetails, handleCancelOrder }) => {
  const { formatCurrency } = useContext(ShopContext);
  return [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <strong>{id}</strong>,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "userId",
      key: "userId",
      render: (user) => <strong>{user ? user.fullname : "N/A"}</strong>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "order_date",
      key: "order_date",
      render: (od) => (
        <strong>{moment.utc(od).format("DD/MM/YYYY hh:mm A")}</strong>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => <strong>{formatCurrency(total)}</strong>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        switch (status) {
          case "pending":
            color = "orange";
            break;
          case "shipping":
            color = "blue";
            break;
          case "completed":
            color = "green";
            break;
          case "cancelled":
            color = "red";
            break;
          default:
            break;
        }
        return <Tag color={color}>{renderStatus(status)}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (order) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => showOrderDetails(order._id)}>
            Xem chi tiết
          </Button>
          {order.status === "pending" && (
            <Button
              style={{ backgroundColor: "#E54C38", color: "white" }}
              type="danger"
              onClick={() => handleCancelOrder(order._id)}
            >
              Hủy
            </Button>
          )}
        </div>
      ),
    },
  ];
};

export default OrderColumn;
