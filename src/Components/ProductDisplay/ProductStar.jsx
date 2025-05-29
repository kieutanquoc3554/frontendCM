import useReviewStats from "../../Hooks/API/useReviewStats";

const StarRating = ({ rate }) => {
  const stars = Array(5).fill(0);
  return (
    <div className="starRating">
      {stars.map((_, index) => (
        <span key={index} className={index < rate ? "star filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
};

const ProductStar = ({ product }) => {
  const { averageRating, totalReviews } = useReviewStats({
    product,
  });
  return (
    <div className="productDisplay-right-star">
      <StarRating rate={Math.round(averageRating)} />
      <p>({totalReviews} lượt đánh giá)</p>
    </div>
  );
};

export default ProductStar;
