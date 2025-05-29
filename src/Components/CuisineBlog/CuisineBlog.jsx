import { useNavigate } from "react-router-dom";

const CuisineBlog = ({ articles }) => {
  const navigate = useNavigate();
  return (
    <div className="articles-grid">
      {articles.map((article) => (
        <div
          style={{ cursor: "pointer" }}
          key={article._id}
          className="article-card"
          onClick={() => navigate(`/cuisine/${article._id}`)}
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
      ))}
    </div>
  );
};

export default CuisineBlog;
