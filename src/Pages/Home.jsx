import React, { useContext } from "react";

import ProductCategory from "./ProductCategory";
import "../Styles/Home.css";
import { ShopContext } from "../Context/ShopContext";
const Home = () => {
  const { products } = useContext(ShopContext);

  const groupByCategory = (category) => {
    return products.filter((product) => product.category.name === category);
  };

  return (
    <div className="home-container">
      <div className="home-item">
        <h1>Sản phẩm của chúng tôi</h1>
      </div>
      <div className="home-item">
        <ProductCategory
          title="Cua Cà Mau"
          category={groupByCategory("crab")}
          type="crab"
        />
      </div>
      <div className="home-item">
        <ProductCategory
          title="Khô cá Cà Mau"
          category={groupByCategory("driedFish")}
          type="driedFish"
        />
      </div>
      <div className="home-item">
        <ProductCategory
          title="Tôm khô"
          category={groupByCategory("driedShrimp")}
          type="driedShrimp"
        />
      </div>
      <div className="home-item">
        <ProductCategory
          title="Bánh phồng tôm"
          category={groupByCategory("prawnCrackers")}
          type="prawnCrackers"
        />
      </div>
      <div className="home-item">
        <ProductCategory
          title="Mật Ong Rừng Cà Mau"
          category={groupByCategory("honey")}
          type="honey"
        />
      </div>
      <div className="home-item">
        <ProductCategory
          title="Bánh - kẹo - mứt"
          category={groupByCategory("candy")}
          type="candy"
        />
      </div>
      <div className="home-item">
        <ProductCategory
          title="Mắm"
          category={groupByCategory("fermentedFishSauce")}
          type="fermentedFishSauce"
        />
      </div>
      <div className="home-item">
        <ProductCategory
          title="Món ngon khác"
          category={groupByCategory("more")}
          type="more"
        />
      </div>
    </div>
  );
};

export default Home;
