const SignUpForm = ({
  formData,
  handleInputChange,
  handleSignUp,
  setState,
}) => {
  return (
    <>
      <div className="loginSignup-container">
        <h1>Đăng ký tài khoản</h1>
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
            name="name"
            placeholder="Nhập tên người dùng"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Vui lòng nhập địa chỉ email"
            value={formData.email}
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
          <input
            type="password"
            name="rePassword"
            placeholder="Vui lòng nhập lại mật khẩu"
            value={formData.rePassword}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSignUp}>Tiếp tục</button>
        <p className="loginSignup-login">
          Bạn đã có tài khoản?{" "}
          <span onClick={() => setState("login")}>Đăng nhập tại đây!</span>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
