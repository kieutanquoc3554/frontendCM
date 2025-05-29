import axios from "axios";
import { useEffect, useState } from "react";

export default function useArticle(id) {
  const [articles, setArticles] = useState([]);
  const [detailArticle, setDetailArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://backendlvtn.onrender.com/articles/"
      );
      const filteredArticles = response.data.filter(
        (article) => article.category === "Du lịch"
      );
      setArticles(filteredArticles);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchArticleById = async () => {
    try {
      const response = await axios.get(
        `https://backendlvtn.onrender.com/articles/${id}`
      );
      setDetailArticle(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async () => {
    try {
      const response = await axios.get(
        "https://backendlvtn.onrender.com/articles"
      );
      const related = response.data.filter((article) => article._id !== id);
      setRelatedArticles(related);
    } catch (err) {
      console.error("Failed to fetch related articles", err);
    }
  };

  useEffect(() => {
    fetchArticleById();
    fetchRelatedArticles();
  }, [id]);

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    loading,
    error,
    fetchArticleById,
    detailArticle,
    relatedArticles,
  };
}
