const ProductSize = ({ product, selectedWeight, handleChangeWeight }) => {
  return (
    <div className="productDisplay-right-size">
      <h1>Chọn trọng lượng</h1>
      <div className="productDisplay-right-sizeItem">
        {product.details.map((detailItem, index) => {
          const availableQuantity =
            detailItem.quantity - detailItem.soldQuantity;

          return (
            <div
              key={index}
              className={`sizeItem ${
                selectedWeight.weight === detailItem.weight &&
                selectedWeight.unit === detailItem.unit.name
                  ? "active"
                  : ""
              } ${availableQuantity === 0 ? "disabled" : ""}`}
              onClick={() => {
                if (availableQuantity > 0) {
                  handleChangeWeight(detailItem.weight, detailItem.unit.name);
                }
              }}
            >
              {detailItem.weight}
              {detailItem.unit.name}
              <p
                style={{
                  fontSize: "12px",
                  color: availableQuantity > 0 ? "#314b7b" : "#ff0000",
                }}
              >
                <strong>
                  {availableQuantity > 0
                    ? `(Còn ${availableQuantity} sản phẩm)`
                    : "Hết hàng"}
                </strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSize;
