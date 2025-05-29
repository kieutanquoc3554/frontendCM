import React from "react";
import ProductItem from "./ProductItem";
import "../Styles/ProductCategory.css";
import { Link } from "react-router-dom";

const ProductCategory = ({ title, category, type }) => {
  return (
    <div className="product-category-container">
      <div className="product-category-header">
        <h2>{title}</h2>
        <Link to={`/${type}`}>
          <b>Xem thêm</b>
        </Link>
      </div>
      <div className="product-list">
        {category.slice(0, 4).map((product, item) => (
          <ProductItem key={item} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
