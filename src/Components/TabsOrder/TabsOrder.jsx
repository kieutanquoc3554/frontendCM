import { Icon } from "@iconify/react/dist/iconify.js";
import { Spin, Table, Tabs } from "antd";
import { useState } from "react";
import OrderColumn from "../OrderColumn/OrderColumn";
import statusOrder from "../../Utils/OrderUtility";

const TabsOrder = ({
  orders,
  loading,
  showOrderDetails,
  renderOrderDetails,
  handleCancelOrder,
}) => {
  const [expandedOrderKeys, setExpandedOrderKeys] = useState([]);
  const { renderStatus, filterOrdersByStatus } = statusOrder({ orders });
  const tabsConfiguration = [
    {
      key: "0",
      label: "Tất cả đơn hàng",
      icon: "mingcute:list-ordered-fill",
      filterStatus: null,
    },
    {
      key: "1",
      label: "Đang chờ xác nhận",
      icon: "uil:truck-loading",
      filterStatus: "pending",
    },
    {
      key: "2",
      label: "Đang vận chuyển",
      icon: "iconamoon:delivery-fast-duotone",
      filterStatus: "shipping",
    },
    {
      key: "3",
      label: "Đã hoàn thành",
      icon: "hugeicons:tick-double-01",
      filterStatus: "completed",
    },
    {
      key: "4",
      label: "Đã huỷ",
      icon: "proicons:filter-cancel",
      filterStatus: "cancelled",
    },
  ];

  const renderTabContent = (data) =>
    loading ? (
      <Spin />
    ) : (
      <>
        <Table
          columns={OrderColumn({
            renderStatus,
            showOrderDetails,
            handleCancelOrder,
          })}
          dataSource={data}
          rowKey="_id"
        >
          {data.map((order) =>
            expandedOrderKeys.includes(order._id)
              ? renderOrderDetails(order)
              : null
          )}
        </Table>
      </>
    );

  return (
    <Tabs defaultActiveKey="0">
      {tabsConfiguration.map(({ key, label, icon, status }) => {
        const filteredOrders = status ? filterOrdersByStatus(status) : orders;
        return (
          <Tabs.TabPane
            key={key}
            tab={
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon icon={icon} />
                {label}
              </span>
            }
          >
            {renderTabContent(filteredOrders)}
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
};

export default TabsOrder;
