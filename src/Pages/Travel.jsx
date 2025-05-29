import "./CSS/Cuisine.css";
import useArticle from "../Hooks/API/useArticles";
import ArticleTravel from "../Components/ArticleTravel/ArticleTravel";

const Travel = () => {
  const { articles, loading, error } = useArticle();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Danh sách bài viết</h1>
      {articles.length === 0 ? (
        <p>Không có bài viết nào.</p>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <ArticleTravel article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Travel;
