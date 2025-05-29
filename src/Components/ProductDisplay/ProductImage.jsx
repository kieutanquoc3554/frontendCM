const ProductImage = ({ mainImage }) => {
  return (
    <div className="productDisplay-img">
      <img
        className="productDisplay-mainImg"
        src={mainImage}
        alt="Main Product"
      />
    </div>
  );
};

export default ProductImage;
