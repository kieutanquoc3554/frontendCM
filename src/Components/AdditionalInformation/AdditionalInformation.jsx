const AdditionalInformation = ({
  formData,
  handleInputChange,
  handleAdditionalInfoSubmit,
}) => {
  return (
    <div className="loginSignup-container">
      <h1>Bổ sung thông tin</h1>
      <p>
        Chúng tôi nhận thấy một vài thông tin liên hệ cơ bản của bạn vẫn còn
        thiếu, hãy cập nhật để quá trình mua bán diễn ra nhanh chóng hơn!
      </p>
      <div className="loginSignup-fields">
        <input
          type="text"
          name="fullname"
          placeholder="Nhập họ và tên"
          value={formData.fullname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Vui lòng nhập số điện thoại"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Vui lòng nhập mật khẩu"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAdditionalInfoSubmit}>Xác nhận</button>
    </div>
  );
};

export default AdditionalInformation;
