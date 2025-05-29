import axios from "axios";
import { Table, Collapse } from "antd";
import { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import moment from "moment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function useOrderHandler({ setOrders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { formatCurrency } = useContext(ShopContext);
  const { Panel } = Collapse;

  const showOrderDetails = async (id) => {
    try {
      const token = localStorage.getItem("tk");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `https://backendlvtn.onrender.com/orders/get/${id}`,
        config
      );
      setSelectedOrder(data.order);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const renderOrderDetails = (order) => (
    <Collapse>
      <Panel
        header={`Tổng số lượng sản phẩm: ${order.orders.length}`}
        key={order._id}
      >
        <Table
          dataSource={order.orders}
          columns={[
            {
              title: "Tên sản phẩm",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Số lượng",
              dataIndex: "quantity",
              key: "quantity",
            },
            {
              title: "Giá",
              dataIndex: "price",
              key: "price",
              render: (price) => <strong>{formatCurrency(price)}</strong>,
            },
            {
              title: "Trạng thái",
              dataIndex: "status",
              key: "status",
            },
          ]}
          rowKey="productId"
          pagination={false}
        />
      </Panel>
    </Collapse>
  );

  const handleCancelOrder = async (id) => {
    try {
      const token = localStorage.getItem("tk");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        `https://backendlvtn.onrender.com/orders/cancel/${id}`,
        {},
        config
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
    }
  };

  const printInvoice = (order) => {
    const { _id, name, order_date, address, total, orders, promotionId } =
      order;

    const docDefinition = {
      content: [
        { text: "Hoá Đơn Bán Hàng", style: "header" },
        {
          columns: [
            [
              { text: `Mã hoá đơn: ${_id}`, style: "subheader" },
              { text: `Khách hàng: ${name}` },
              {
                text: `Ngày đặt: ${moment
                  .utc(order_date)
                  .format("DD/MM/YYYY hh:mm A")}`,
              },
              { text: `Địa chỉ giao hàng: ${address}` },
              { text: `Khuyến mãi đã dùng: ${promotionId?.name}` },
            ],
          ],
        },
        { text: "Danh sách sản phẩm", style: "subheader" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "auto"],
            body: [
              ["Tên sản phẩm", "Số lượng", "Đơn giá", "Thành tiền"],
              ...orders.map((item) => [
                item.name,
                item.quantity,
                formatCurrency(item.price),
                formatCurrency(item.quantity * item.price),
              ]),
              [
                { text: "Tổng tiền", colSpan: 3, alignment: "right" },
                {},
                {},
                formatCurrency(total),
              ],
            ],
          },
        },
        { text: "Cảm ơn quý khách đã mua hàng!", style: "footer" },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        footer: {
          fontSize: 12,
          italics: true,
          alignment: "center",
          margin: [0, 10, 0, 0],
        },
      },
    };

    pdfMake.createPdf(docDefinition).print();
  };

  return {
    selectedOrder,
    isModalVisible,
    showOrderDetails,
    handleCancel,
    renderOrderDetails,
    handleCancelOrder,
    printInvoice,
  };
}
