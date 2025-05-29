import { Link } from "react-router-dom";

const RelatedArticle = ({ relatedArticles }) => {
  return (
    <div className="related-articles">
      <h2>Các bài viết khác</h2>
      {relatedArticles.map((relatedArticle) => (
        <Link
          key={relatedArticle._id}
          to={
            relatedArticle.category === "Ẩm thực"
              ? `/cuisine/${relatedArticle._id}`
              : `/travel/${relatedArticle._id}`
          }
          className="related-article"
        >
          <img
            src={relatedArticle.coverImage}
            alt={relatedArticle.title}
            className="related-article-image"
          />
          <h3>{relatedArticle.title}</h3>
          <p>{new Date(relatedArticle.createdAt).toLocaleDateString()}</p>
        </Link>
      ))}
    </div>
  );
};

export default RelatedArticle;
