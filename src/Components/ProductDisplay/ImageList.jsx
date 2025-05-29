const ImageList = ({ product, setMainImage }) => {
  return (
    <div className="productDisplay-imageList">
      {product.images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt=""
          onClick={() => setMainImage(image.url)}
          className="thumbnail"
        />
      ))}
    </div>
  );
};

export default ImageList;
