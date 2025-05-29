import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CSS/homeCategory.css";
import Item from "../Components/Items/Item";
import Search from "../Components/Search/Search";

const HomeCategory = (props) => {
  const { products, searchQuery } = useContext(ShopContext);
  const [filterPrice, setFilterPrice] = useState({ min: 0, max: 1500000 });
  const [sortOrder, setSortOrder] = useState("asc");
  const [banners, setBanners] = useState([]); // State để lưu banner

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          `https://backendlvtn.onrender.com/products/category/${props.category}/banners`
        );
        setBanners(response.data.banners); // Lưu banner vào state
      } catch (error) {
        console.error("Lỗi khi lấy banner:", error);
      }
    };

    fetchBanners();
  }, [props.category]);

  const filteredProducts = products
    .filter((product) => {
      const price = product.details[0]?.finalPrice || 0;
      return price >= filterPrice.min && price <= filterPrice.max;
    })
    .filter((product) =>
      product.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(
          searchQuery
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        )
    );

  const sortedProducts = filteredProducts.sort((a, b) => {
    const priceA = a.details[0]?.finalPrice || 0;
    const priceB = b.details[0]?.finalPrice || 0;
    return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
  });

  const handleClickProduct = async (productId) => {
    const userId = localStorage.getItem("lfl");

    try {
      await axios.post(
        `https://backendlvtn.onrender.com/users/viewed/${userId}`,
        {
          productId,
        }
      );
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm đã xem:", error);
    }
  };

  console.log(banners);

  return (
    <div className="home-category">
      <div className="banner-container" style={{ height: "50%" }}>
        {banners.length > 0 ? (
          <Carousel
            autoPlay={true}
            interval={2000}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            stopOnHover={false}
          >
            {banners.map((banner, index) => (
              <div key={index}>
                <img
                  style={{ width: "100%", height: "50%" }}
                  src={banner}
                  alt={`Banner ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <p>Không có banner cho danh mục này.</p>
        )}
      </div>
      <div className="title">
        <p>
          Dòng sản phẩm:{" "}
          <strong style={{ color: "#314b7b" }}>
            {props.category === "crab"
              ? "Cua Cà Mau"
              : props.category === "driedFish"
              ? "Cá khô Cà Mau"
              : props.category === "driedShrimp"
              ? "Tôm khô Cà Mau"
              : props.category === "prawnCrackers"
              ? "Bánh phồng tồm"
              : props.category === "honey"
              ? "Mật Ong Rừng Cà Mau"
              : props.category === "candy"
              ? "Kẹo - Mứt"
              : props.category === "fermentedFishSauce"
              ? "Mắm"
              : "Món Ngon Khác"}
          </strong>
        </p>
      </div>
      <div className="search-container">
        <Search />
      </div>
      <div className="filter-sort-container">
        <div className="filter-price">
          <label>
            Giá từ:
            <input
              type="number"
              value={filterPrice.min}
              onChange={(e) =>
                setFilterPrice({ ...filterPrice, min: e.target.value })
              }
            />
          </label>
          <label>
            Giá đến:
            <input
              type="number"
              value={filterPrice.max}
              onChange={(e) =>
                setFilterPrice({ ...filterPrice, max: e.target.value })
              }
            />
          </label>
        </div>

        <div className="sort-container">
          <label>
            Sắp xếp theo giá:
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Tăng dần</option>
              <option value="desc">Giảm dần</option>
            </select>
          </label>
        </div>
      </div>

      <div className="category-product">
        {sortedProducts.map((item, index) =>
          item.category.name === props.category ? (
            <div key={index} onClick={() => handleClickProduct(item._id)}>
              <Item
                key={index}
                id={item._id}
                name={item.name}
                image={item.images[0]?.url}
                discount={item.details[0].discount}
                price={item.details[0]?.finalPrice}
                weight={item.details[0]?.weight}
                unit={item.details[0]?.unit.name}
                prePrice={item.details[0]?.initPrice}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default HomeCategory;
