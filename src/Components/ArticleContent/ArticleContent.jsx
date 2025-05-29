const ArticleContent = ({ detailArticle }) => {
  return (
    <div className="article-container">
      <h1 className="article-name">{detailArticle.title}</h1>
      <p
        className="article-date"
        style={{ textAlign: "right", fontStyle: "italic" }}
      >
        Tác giả:{" "}
        <strong>{detailArticle.author?.fullname || "Đang cập nhật"}</strong>
      </p>
      <img
        src={detailArticle.coverImage}
        alt={detailArticle.title}
        className="article-image"
      />
      <p className="article-date">
        Đã tạo: {new Date(detailArticle.createdAt).toLocaleString()}
      </p>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: detailArticle.content }}
      />
    </div>
  );
};

export default ArticleContent;
