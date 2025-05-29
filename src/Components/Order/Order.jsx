import { useEffect } from "react";
import "./Order.css";
import useOrder from "../../Hooks/API/useOrder";
import useOrderHandler from "../../Hooks/Handler/useOrderHandler";
import TabsOrder from "../TabsOrder/TabsOrder";
import OrderModal from "../OrderModal/OrderModal";

const Order = () => {
  const { fetchOrders, orders, loading, setOrders } = useOrder();
  const {
    selectedOrder,
    isModalVisible,
    showOrderDetails,
    handleCancel,
    renderOrderDetails,
    handleCancelOrder,
    printInvoice,
  } = useOrderHandler({ setOrders });

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-page">
      <h2>Quản lý đơn hàng</h2>
      <div className="tab">
        <TabsOrder
          orders={orders}
          loading={loading}
          showOrderDetails={showOrderDetails}
          renderOrderDetails={renderOrderDetails}
          handleCancelOrder={handleCancelOrder}
        />
        <OrderModal
          selectedOrder={selectedOrder}
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          printInvoice={printInvoice}
        />
      </div>
    </div>
  );
};

export default Order;
