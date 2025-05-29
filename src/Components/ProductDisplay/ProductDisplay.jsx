import { useContext, useEffect, useState } from "react";
import "./ProductDisplay.css";
import RelatedProduct from "../RelatedProduct/RelatedProduct";
import { ShopContext } from "../../Context/ShopContext";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewList from "../ReviewList/ReviewList";
import ImageList from "./ImageList";
import ProductImage from "./ProductImage";
import ProductStar from "./ProductStar";
import ProductPrice from "./ProductPrice";
import ProductSize from "./ProductSize";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [price, setPrice] = useState(product?.details[0]?.finalPrice || 0);
  const [initPrice, setInitPrice] = useState(
    product?.details[0].initPrice || 0
  );
  const [selectedWeight, setSelectedWeight] = useState({
    weight: product?.details[0]?.weight || "",
    unit: product?.details[0]?.unit?.name || "",
  });
  const [discount, setDiscount] = useState(product?.details[0]?.discount || 0);
  const [mainImage, setMainImage] = useState(product.images[0].url);

  const handleChangeWeight = (w, u) => {
    setSelectedWeight({ weight: w, unit: u });
    const selectedDetail = product.details.find(
      (detail) => detail.weight === w && detail.unit.name === u
    );
    if (selectedDetail) {
      setPrice(selectedDetail.finalPrice);
      setDiscount(selectedDetail.discount);
      setInitPrice(selectedDetail.initPrice);
    }
  };

  useEffect(() => {
    const firstDetail = product?.details?.[0];
    if (firstDetail) {
      setPrice(firstDetail.finalPrice || 0);
      setInitPrice(firstDetail.initPrice || 0);
      setDiscount(firstDetail.discount || 0);
      setSelectedWeight({
        weight: firstDetail.weight || "",
        unit: firstDetail.unit?.name || "",
      });
    }
    setMainImage(product?.images?.[0]?.url || "");
  }, [product]);

  return (
    <>
      <div className="productDisplay">
        <div className="productDisplay-left">
          {discount !== 0 && (
            <div className="discount-ribbon">
              <span>Giảm {discount}%</span>
            </div>
          )}
          <ImageList product={product} setMainImage={setMainImage} />
          <ProductImage mainImage={mainImage} />
        </div>
        <div className="productDisplay-right">
          <h1>{product.name}</h1>
          <ProductStar product={product} />
          <ProductPrice
            discount={discount}
            initPrice={initPrice}
            price={price}
            selectedWeight={selectedWeight}
          />
          <div className="productDisplay-right-description">
            {product.description}
          </div>
          <ProductSize
            product={product}
            selectedWeight={selectedWeight}
            handleChangeWeight={handleChangeWeight}
          />

          {product.details.some(
            (detailItem) => detailItem.quantity - detailItem.soldQuantity > 0
          ) ? (
            <button
              onClick={() => {
                addToCart(product._id, selectedWeight, price, discount);
              }}
            >
              Thêm vào giỏ hàng
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <ReviewForm productId={product._id} />
      <ReviewList productId={product._id} />
      <RelatedProduct productProps={product} />
    </>
  );
};

export default ProductDisplay;
