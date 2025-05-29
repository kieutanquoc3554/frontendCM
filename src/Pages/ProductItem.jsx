import React from "react";
import "../Styles/ProductItem.css";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="item-container">
        {product.details[0].discount !== 0 && (
          <div className="discount-ribbon">
            <span>Giảm {product.details[0].discount}%</span>
          </div>
        )}
        <div className="item-main">
          <img src={product.images[0].url} alt={product.name} />
        </div>
        <div className="item-main">
          <h4 className="productName">{product.name}</h4>
          <p>
            Giá:{" "}
            <b>
              {product.details[0].finalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
              /{product.details[0].weight}
              {product.details[0].unit.name}
            </b>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
