import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";

const CartContainer = ({
  product,
  productCartItems,
  removeFromCart,
  updateCartQuantity,
  products,
}) => {
  const { formatCurrency } = useContext(ShopContext);

  const handleUpdateQuantity = (productId, cartItem, newQuantity) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      const productDetail = product.details.find(
        (detail) =>
          detail.weight === Number(cartItem.weight) &&
          cartItem.unit &&
          detail.unit &&
          cartItem.unit === detail.unit.name
      );
      if (!productDetail) {
        alert("Không tìm thấy thông tin chi tiết sản phẩm!");
        return;
      }
      const availableQuantity =
        productDetail.quantity - productDetail.soldQuantity;
      if (newQuantity > availableQuantity) {
        toast.error("Số lượng đặt không được vượt quá số lượng trong kho!");
        return;
      }
      updateCartQuantity(productId, cartItem, newQuantity);
    } else {
      alert("Không tìm thấy sản phẩm!");
    }
  };

  return (
    <div key={product._id}>
      {productCartItems.map((cartItem, index) => (
        <div key={index} className="cartItems-format cartItems-main">
          <img
            className="cartIcon-product"
            src={product.images[0].url}
            alt={product.name}
          />
          <p className="cartItems-productName">{product.name}</p>
          <p>
            {cartItem.weight} {cartItem.unit}{" "}
          </p>
          <p>{formatCurrency(cartItem.price)}</p>
          <div className="quantity-container">
            <Icon
              icon="ph:minus-fill"
              onClick={() =>
                handleUpdateQuantity(
                  product._id,
                  cartItem,
                  cartItem.quantity - 1
                )
              }
            />
            <input
              type="number"
              value={cartItem.quantity}
              className="cartItems-quantity-input"
              onChange={(event) =>
                handleUpdateQuantity(
                  product._id,
                  cartItem,
                  Number(event.target.value)
                )
              }
            />
            <Icon
              icon="ph:plus-fill"
              onClick={() =>
                handleUpdateQuantity(
                  product._id,
                  cartItem,
                  cartItem.quantity + 1
                )
              }
            />
          </div>
          <p>{formatCurrency(cartItem.price * cartItem.quantity)}</p>
          <Icon
            width={"30px"}
            cursor={"pointer"}
            className="cartItems-removeIcon"
            icon="mdi:cart-remove"
            onClick={() => removeFromCart(product._id, cartItem)}
          />
        </div>
      ))}
    </div>
  );
};

export default CartContainer;
