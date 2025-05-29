import React, { useContext } from "react";
import "./RelatedProduct.css";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Items/Item";

const RelatedProduct = (props) => {
  const { productProps } = props;
  const { products } = useContext(ShopContext);

  const relatedProducts = products
    .filter(
      (product) =>
        productProps.category.name === product.category.name &&
        productProps.name !== product.name
    )
    .slice(0, 5);

  return (
    <div className="relatedProduct-container">
      <h1>Có thể bạn cũng sẽ thích</h1>
      <div className="relatedProduct">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <Item
              key={product._id}
              id={product._id}
              name={product.name}
              image={product.images[0].url}
              weight={product.details[0].weight}
              unit={product.details[0].unit.name}
              prePrice={product.details[0].initPrice}
              price={product.details[0].finalPrice}
              discount={product.details[0].discount}
            />
          ))
        ) : (
          <div>
            <p>Chưa có sản phẩm nào liên quan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;
