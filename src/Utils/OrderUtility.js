export default function renderStatus({ orders }) {
  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        status = "Đang chờ xử lý";
        break;
      case "shipping":
        status = "Đang vận chuyển";
        break;
      case "completed":
        status = "Đã giao";
        break;
      case "cancelled":
        status = "Đã huỷ";
        break;
      default:
        break;
    }
    return status;
  };

  const filterOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status);
  };

  return { renderStatus, filterOrdersByStatus };
}
