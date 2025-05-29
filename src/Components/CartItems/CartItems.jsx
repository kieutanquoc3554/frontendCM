import { useContext, useState, useMemo } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import EmptyCart from "../EmptyCart/EmptyCart";
import CartContainer from "../CartContainer/CartContainer";
import CartTotal from "../CartTotal/CartTotal";

const CartItems = () => {
  const {
    products,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    updateCartQuantity,
    discountedAmount,
    type,
  } = useContext(ShopContext);

  const [showConfetti, setShowConfetti] = useState(false);

  const cartProductList = useMemo(() => {
    return products
      .map((product) => {
        const productCartItems = cartItems[product._id];
        if (productCartItems && productCartItems.length > 0) {
          return (
            <CartContainer
              key={product._id}
              product={product}
              productCartItems={productCartItems}
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
              products={products}
            />
          );
        }
        return null;
      })
      .filter(Boolean);
  }, [products, cartItems]);

  const isEmptyCart = useMemo(() => {
    return Object.values(cartItems).every((item) => item.length === 0);
  }, [cartItems]);

  return (
    <div className="cartItems">
      {showConfetti && <Confetti />}
      {isEmptyCart ? (
        <EmptyCart setShowConfetti={setShowConfetti} />
      ) : (
        <>
          <div className="cartItems-main">
            <p>Sản phẩm</p>
            <p>Tên sản phẩm</p>
            <p>Trọng lượng</p>
            <p>Giá</p>
            <p>Số lượng</p>
            <p>Tổng tiền</p>
            <p>Xoá</p>
          </div>

          {cartProductList}

          <div className="cartItems-down">
            <div className="cartItems-total">
              <Link to="/cart/checkout">
                <CartTotal
                  getTotalCartAmount={getTotalCartAmount}
                  discountedAmount={discountedAmount}
                  type={type}
                />
                <button>Thanh toán</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;
