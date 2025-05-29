import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewProduct.css"; // Đảm bảo import CSS

const ViewProduct = () => {
  const [viewedProduct, setViewedProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchViewedProduct = async () => {
      try {
        const token = localStorage.getItem("tk");
        const response = await axios.get(
          `https://backendlvtn.onrender.com/users/viewed`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setViewedProduct(response.data.products);
      } catch (error) {
        toast.error("Lỗi khi tải danh sách sản phẩm đã xem.");
      }
    };
    fetchViewedProduct();
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProducts = viewedProduct.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="view-product-container">
      <h3 className="titleName">Danh sách sản phẩm đã xem</h3>
      <div className="product-grid">
        {paginatedProducts.map(({ product }) => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => handleCardClick(product._id)}
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.description}
              className="product-image"
            />
            <div className="product-info">
              <h5 className="product-name">{product.name}</h5>
              <p className="product-code">Mã sản phẩm: {product.code}</p>
              <p className="product-price">
                Giá: {product.details[0]?.finalPrice.toLocaleString()} VND
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        <span className="pagination-info">
          Trang {currentPage} / {Math.ceil(viewedProduct.length / pageSize)}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(viewedProduct.length / pageSize)}
        >
          Trang tiếp
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
