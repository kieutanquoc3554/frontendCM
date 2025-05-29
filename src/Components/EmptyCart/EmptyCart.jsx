import { toast } from "react-toastify";
import logo_icon from "../Assets/pngwing.com.png";

const EmptyCart = ({ setShowConfetti }) => {
  const handleSurprise = () => {
    toast.info("🎉 Bất ngờ! Dô kiếm gì mua đi má 🎉");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <img alt="logo" src={logo_icon} style={{ width: "20%" }} />
      <div style={{ fontSize: "18px" }}>
        <span>Có vẻ như giỏ hàng chả có cái gì? </span>
        <b
          style={{ cursor: "pointer", color: "#0463ab" }}
          onClick={handleSurprise}
        >
          Ấn vào đây để có bất ngờ
        </b>
      </div>
    </div>
  );
};

export default EmptyCart;
