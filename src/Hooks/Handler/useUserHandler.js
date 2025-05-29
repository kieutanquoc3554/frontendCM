import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useUserHandler({ userInfo, newPassword }) {
  const [isEditing, setIsEditing] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("tk");

    try {
      await axios.put(
        `https://backendlvtn.onrender.com/users/update`,
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handlePasswordChange = async () => {
    setOtpSent(true);
    try {
      const response = await axios.post(
        "https://backendlvtn.onrender.com/users/sendOtp",
        {
          email: userInfo.email,
        }
      );
      if (response) {
        toast.success("Đã gửi thành công mã OTP");
      }
    } catch (error) {
      toast.error("Lỗi khi gửi OTP");
    }
  };

  const handleOTPCheck = async () => {
    try {
      await axios.post("https://backendlvtn.onrender.com/users/verifyOTP", {
        email: userInfo.email,
        otpCode,
      });
      toast.success("Xác minh thành công, hãy nhập mật khẩu mới");
      setSuccess(true);
    } catch (error) {
      toast.error("Lỗi khi xác minh OTP");
    }
  };

  const handleNewPasswordSave = async () => {
    try {
      await axios.put("https://backendlvtn.onrender.com/users/resetPassword", {
        email: userInfo.email,
        newPassword,
      });
      alert("Mật khẩu đã được cập nhật!");
      setOtpSent(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error);
    }
  };

  return {
    isEditing,
    handleEditClick,
    setIsEditing,
    handleSaveClick,
    handlePasswordChange,
    otpSent,
    setOtpSent,
    success,
    otpCode,
    setOtpCode,
    handleOTPCheck,
    handleNewPasswordSave,
  };
}
