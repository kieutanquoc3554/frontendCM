import "./CSS/Cuisine.css";
import useCuisineBlog from "../Hooks/API/useCuisineBlog";
import CuisineBlog from "../Components/CuisineBlog/CuisineBlog";

const Cuisine = () => {
  const { articles, loading, error } = useCuisineBlog();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>Danh sách bài viết</h1>
      {articles.length === 0 ? (
        <p>Không có bài viết nào.</p>
      ) : (
        <CuisineBlog articles={articles} />
      )}
    </div>
  );
};

export default Cuisine;
