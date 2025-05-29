import { useParams, Link } from "react-router-dom";
import "./ArticleDetail.css";
import useArticle from "../../Hooks/API/useArticles";
import ArticleContent from "../ArticleContent/ArticleContent";
import RelatedArticle from "../RelatedArticle/RelatedArticle";

const ArticleDetail = () => {
  const { id } = useParams();
  const { detailArticle, loading, error, relatedArticles } = useArticle(id);

  if (loading) {
    return (
      <div className="article-skeleton">
        <div className="skeleton title"></div>
        <div className="skeleton image"></div>
        <div className="skeleton date"></div>
        <div className="skeleton content"></div>
      </div>
    );
  }

  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="article-page">
      <ArticleContent detailArticle={detailArticle} />
      <RelatedArticle relatedArticles={relatedArticles} />
    </div>
  );
};

export default ArticleDetail;
