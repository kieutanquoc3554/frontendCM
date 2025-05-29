import { useNavigate } from "react-router-dom";

const ArticleTravel = ({ article }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{ cursor: "pointer" }}
      key={article._id}
      className="article-card"
      onClick={() => navigate(`/travel/${article._id}`)}
    >
      <img
        src={article.coverImage}
        alt={article.title}
        className="article-image"
      />
      <h2 className="article-title">{article.title}</h2>
      <p className="article-date">
        Đã tạo: {new Date(article.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default ArticleTravel;
