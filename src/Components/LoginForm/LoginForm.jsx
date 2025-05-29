const LoginForm = ({ formData, handleInputChange, handleLogin }) => {
  return (
    <>
      <h1>Đăng nhập tài khoản</h1>
      <div className="loginSignup-fields">
        <input
          type="email"
          name="email"
          placeholder="Nhập email"
          value={formData.email}
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
      <button onClick={handleLogin}>Đăng nhập</button>
    </>
  );
};

export default LoginForm;
