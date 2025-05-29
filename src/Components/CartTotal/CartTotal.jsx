import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const CartTotal = ({ getTotalCartAmount, discountedAmount, type }) => {
  const { formatCurrency } = useContext(ShopContext);
  return (
    <>
      <h1>Tổng cộng</h1>
      <div>
        <div className="cartItems-totalItems">
          <p>Giá dự kiến</p>
          <p>{formatCurrency(getTotalCartAmount())}</p>
        </div>
        <hr />
        <div className="cartItems-totalItems">
          <p>Giảm giá</p>
          {type ? (
            <p>- {formatCurrency(getTotalCartAmount() - discountedAmount)}</p>
          ) : (
            <p>{formatCurrency(0)}</p>
          )}
        </div>
        <hr />
        <div className="cartItems-totalItems">
          {type ? (
            <h3>Tổng tiền: {formatCurrency(discountedAmount)}</h3>
          ) : (
            <h3>Tổng tiền: {formatCurrency(getTotalCartAmount())}</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default CartTotal;
