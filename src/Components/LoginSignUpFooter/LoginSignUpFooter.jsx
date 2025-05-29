const LoginSignupFooter = ({ setState }) => {
  return (
    <>
      <p className="loginSignup-login">
        Quên mật khẩu?{" "}
        <span onClick={() => setState("resetPassword")}>Cấp lại mật khẩu</span>
      </p>
      <p className="loginSignup-login">
        Bạn chưa có tài khoản{" "}
        <span onClick={() => setState("signup")}>Đăng ký tại đây!</span>
      </p>
    </>
  );
};

export default LoginSignupFooter;
