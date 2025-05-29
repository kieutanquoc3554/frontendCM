import axios from "axios";
import { useEffect, useState } from "react";

export default function useCuisineBlog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://backendlvtn.onrender.com/articles/"
      );
      const filteredArticles = response.data.filter(
        (article) => article.category === "Ẩm thực"
      );
      setArticles(filteredArticles);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return { articles, loading, error };
}
