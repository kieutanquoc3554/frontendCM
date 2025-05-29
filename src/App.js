import "./App.css";
import Navbar from "./Components/NavigationBar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import HomeCategory from "./Pages/HomeCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Cuisine from "./Pages/Cuisine";
import Footer from "./Components/Footer/Footer";
import { DarkModeProvider, DarkModeContext } from "../src/Context/UIContext";
import { useContext } from "react";
import ProfileView from "./Components/ProfileView/ProfileView";
import Information from "./Components/Information/Information";
import Checkout from "./Components/Checkout/Checkout";
import Order from "./Components/Order/Order";
import ArticleDetail from "./Components/ArticleDetail/ArticleDetail";
import ViewProduct from "./Components/ViewProduct/ViewProduct";
import Travel from "./Pages/Travel";
import Tutorial from "./Components/Tutorial/Tutorial";
import Help from "./Pages/Q&A";
import SearchResult from "./Components/SearchResult/SearchResult";

function App() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crab" element={<HomeCategory category="crab" />} />
          <Route
            path="/driedFish"
            element={<HomeCategory category="driedFish" />}
          />
          <Route
            path="/driedShrimp"
            element={<HomeCategory category="driedShrimp" />}
          />
          <Route
            path="/prawnCrackers"
            element={<HomeCategory category="prawnCrackers" />}
          />
          <Route path="/honey" element={<HomeCategory category="honey" />} />
          <Route path="/candy" element={<HomeCategory category="candy" />} />
          <Route
            path="/fermentedFishSauce"
            element={<HomeCategory category="fermentedFishSauce" />}
          />
          <Route path="/more" element={<HomeCategory category="more" />} />
          <Route path="/product" element={<Product />}>
            <Route path="/product/:productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/login" element={<LoginSignup />}></Route>
          <Route path="/cuisine" element={<Cuisine />}></Route>
          <Route path="/tutorial" element={<Tutorial />}></Route>
          <Route path="/help" element={<Help />}></Route>
          <Route path="/cuisine/:id" element={<ArticleDetail />} />
          <Route path="/travel" element={<Travel />}></Route>
          <Route path="/travel/:id" element={<ArticleDetail />}></Route>
          <Route path="/profile" element={<ProfileView />}>
            <Route
              path="/profile/information"
              element={<Information />}
            ></Route>
            <Route path="/profile/orders" element={<Order />} />
            <Route path="/profile/viewed" element={<ViewProduct />} />
          </Route>
          <Route path="/search" element={<SearchResult />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default () => (
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
);
