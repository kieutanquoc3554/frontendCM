import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../../Context/ShopContext";

export default function useLoginSignupHandler({
  otpCode,
  resetEmail,
  newPassword,
}) {
  const navigate = useNavigate();
  const { setIsLogin, setUser } = useContext(ShopContext);
  const [isAdditionalInfoRequired, setIsAdditionalInfoRequired] =
    useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    fullname: "",
    rePassword: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSuccess = async (res) => {
    try {
      const response = await axios.post(
        "https://backendlvtn.onrender.com/users/google-login",
        {
          token: res.credential,
        }
      );
      const { user, token } = response.data;
      localStorage.setItem("tk", token);
      setUser(token);
      setIsLogin(true);
      if (!user.phone || !user.fullname || !user.password) {
        setIsAdditionalInfoRequired(true);
        setFormData((prev) => ({
          ...prev,
          email: user.email,
          name: user.name,
        }));
      } else {
        toast.success("Đăng nhập thành công");
        navigate("/");
      }
    } catch (error) {
      toast.error("Đăng nhập Google thất bại");
      console.error(error);
    }
  };

  const handleAdditionalInfoSubmit = async () => {
    try {
      if (!formData.phone || !formData.fullname || !formData.password) {
        toast.error("Chưa được cập nhật đầy đủ!");
        return;
      }
      await axios.post(
        "https://backendlvtn.onrender.com/users/update-info",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );
      toast.success("Đăng ký thành công");
      navigate("/");
    } catch (error) {
      toast.error("Cập nhật thông tin bổ sung thất bại!");
      console.error(error);
    }
  };

  const onFailure = (res) => {
    console.log(res);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "https://backendlvtn.onrender.com/users/signup",
        formData
      );
      localStorage.setItem("tk", response.data.token);
      toast.success("Đăng ký thành công");
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://backendlvtn.onrender.com/users/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      localStorage.setItem("tk", response.data.token);
      setIsLogin(true);
      toast.success("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  const handlePasswordChange = async () => {
    if (!resetEmail) {
      toast.error("Vui lòng nhập email để nhận mã OTP");
      return;
    }
    toast(resetEmail);
    setOtpSent(true);
    try {
      const response = await axios.post(
        "https://backendlvtn.onrender.com/users/sendOtp",
        {
          email: resetEmail,
        }
      );
      if (response) {
        toast.success("Đã gửi thành công mã OTP");
      }
    } catch (error) {
      toast.error("Lỗi khi gửi OTP", error);
      console.log("Lỗi khi gửi OTP", error);
    }
  };

  const handleOTPCheck = async () => {
    try {
      const response = await axios.post(
        "https://backendlvtn.onrender.com/users/verifyOTP",
        {
          email: resetEmail,
          otpCode,
        }
      );
      toast.success("Xác minh thành công, hãy nhập mật khẩu mới");
      setSuccess(true);
    } catch (error) {
      toast.error("Lỗi khi xác minh OTP");
    }
  };

  const handleNewPasswordSave = async () => {
    try {
      await axios.put("https://backendlvtn.onrender.com/users/resetPassword", {
        email: resetEmail,
        newPassword,
      });
      alert("Mật khẩu đã được cập nhật!");
      setOtpSent(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error);
    }
  };

  return {
    isAdditionalInfoRequired,
    formData,
    handleInputChange,
    handleAdditionalInfoSubmit,
    handleLogin,
    onSuccess,
    onFailure,
    handleSignUp,
    otpSent,
    success,
    handleOTPCheck,
    handleNewPasswordSave,
    handlePasswordChange,
  };
}
