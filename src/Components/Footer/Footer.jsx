import React from "react";
import "./Footer.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-left">
          <h3>Công ty TNHH một thành viên TiQi Food</h3>
          <p>
            Chuyên cung cấp các mặt hàng đặc sản, bánh, kèo, đồ khô chuẩn vị Cà
            Mau. Giao hàng miễn phí nội ô TP Cần Thơ
          </p>
          <div className="footer-left-info">
            <p>
              <strong>Địa chỉ hộ kinh doanh:</strong> 12/8, đường 30 tháng 4,
              phường Xuân Khánh, Ninh Kiều, Cần Thơ
            </p>
          </div>
          <div className="footer-left-info">
            <p>
              <strong>Địa chỉ sản xuất:</strong> 268 Ấp Kinh Hãng A, Khánh Hưng,
              Trần Văn Thời, Cà Mau
            </p>
          </div>
          <div className="footer-left-info">
            <p>
              <strong>Điện thoại:</strong> 0123456789
            </p>
          </div>
          <div className="footer-left-info">
            <strong>Thứ 2-6: 8h - 20h; Thứ 7-CN: 9h - 17h</strong>
          </div>
        </div>
        <div className="footer-middle">
          <h3>Danh mục sản phẩm</h3>
          <ul className="product-list-footer">
            <li>
              <Link to="/driedFish">Khô cá Cà Mau</Link>
            </li>
            <li>
              <Link to="/driedShrimp">Tôm khô</Link>
            </li>
            <li>
              <Link to="/prawnCrackers">Bánh phồng tôm</Link>
            </li>
            <li>
              <Link to="/honey">Mật Ong Rừng Cà Mau</Link>
            </li>
            <li>
              <Link to="/candy">Bánh kẹo</Link>
            </li>
            <li>
              <Link to="/fermentedFishSauce">Mắm</Link>
            </li>
            <li>
              <Link to="/more">Món ngon khác</Link>
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <h3>Chúng tôi ở đâu?</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3596.3223208686245!2d105.76804037456668!3d10.02993897251979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e1!3m2!1svi!2s!4v1726660083219!5m2!1svi!2s"
            width="130%"
            height="250"
            style={{ border: 0, borderRadius: "15px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
      <div className="end" style={{ textAlign: "center", margin: "20px auto" }}>
        <span>
          Bản quyền thuộc <strong>Kiều Tấn Quốc</strong>
        </span>
      </div>
    </>
  );
};

export default Footer;
