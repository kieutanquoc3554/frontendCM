import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./SearchResult.css";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://backendlvtn.onrender.com/products/search/query?q=${query}`
        );
        setResults(response.data);
      } catch (err) {
        setError("Không thể tải kết quả tìm kiếm.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) return <p>Đang tải kết quả...</p>;
  if (error) return <p>{error}</p>;
  if (!results.length) return <p>Không tìm thấy kết quả nào cho "{query}".</p>;

  return (
    <div className="search-results">
      <h2>Kết quả tìm kiếm cho "{query}"</h2>
      <div className="items">
        {results.map((item) => (
          <Link to={`/product/${item._id}`} onClick={window.scrollTo(0, 0)}>
            <div className="item" key={item.id}>
              <div className="discount-ribbon">
                <span>Giảm {item.details[0].discount}%</span>
              </div>
              <img src={item.images[0].url} alt={item.name} />
              <h3>{item.name}</h3>
              <div className="item-prices">
                {item.details[0].initPrice && (
                  <span className="old-prices">
                    Giá gốc: {item.details[0].initPrice} VND
                  </span>
                )}
                <span className="prices">
                  Giá giảm: {item.details[0].finalPrice} VND
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
