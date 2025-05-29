import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const DetailOrderColumn = () => {
  const { formatCurrency } = useContext(ShopContext);
  return [
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    {
      title: "Trọng lượng",
      key: "weight_unit",
      render: (record) => `${record.weight} ${record.unit}`,
    },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    {
      title: "Khuyến mãi",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => <p>{discount}%</p>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <strong>{formatCurrency(price)}</strong>,
    },
  ];
};

export default DetailOrderColumn;
