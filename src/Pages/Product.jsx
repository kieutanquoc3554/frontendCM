import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";

const Product = () => {
  // const { all_product } = useContext(ShopContext);
  const { products } = useContext(ShopContext);
  const { productId } = useParams();
  const product = products.find((e) => e._id === productId);
  return (
    <div>
      {product ? (
        <ProductDisplay product={product} />
      ) : (
        <div>Sản phẩm không tồn tại.</div>
      )}
    </div>
  );
};

export default Product;
