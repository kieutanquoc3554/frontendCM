import { Button, Modal, Spin } from "antd";
import DetailOrderColumn from "../OrderColumn/DetailOrderColumn";
import OrderDetailInformation from "./OrderDetailInformation";

const OrderModal = ({
  selectedOrder,
  isModalVisible,
  handleCancel,
  printInvoice,
}) => {
  return (
    <Modal
      width={800}
      title="Chi tiết đơn hàng"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button
          key="print"
          type="primary"
          onClick={() => printInvoice(selectedOrder)}
        >
          In hoá đơn
        </Button>,
        <Button key="close" onClick={handleCancel}>
          Đóng
        </Button>,
      ]}
    >
      {selectedOrder ? (
        <OrderDetailInformation
          selectedOrder={selectedOrder}
          DetailOrderColumn={DetailOrderColumn}
        />
      ) : (
        <Spin />
      )}
    </Modal>
  );
};

export default OrderModal;
