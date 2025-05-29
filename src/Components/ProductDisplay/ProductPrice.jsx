import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const ProductPrice = ({ discount, initPrice, price, selectedWeight }) => {
  const { formatCurrency } = useContext(ShopContext);
  return (
    <div className="productDisplay-right-priceMain">
      {discount !== 0 && (
        <div className="productDisplay-right-initPrices">
          {formatCurrency(initPrice)} / {selectedWeight.weight}
          {selectedWeight.unit}
        </div>
      )}
      <div className="productDisplay-right-prices">
        {formatCurrency(price)} / {selectedWeight.weight}
        {selectedWeight.unit} (Tiết kiệm được{" "}
        {formatCurrency(initPrice - price)})
      </div>
    </div>
  );
};

export default ProductPrice;
