const ResetPasswordForm = ({
  otpSent,
  otpCode,
  setOtpCode,
  newPassword,
  setNewPassword,
  handleOTPCheck,
  handleNewPasswordSave,
  resetEmail,
  setResetEmail,
  success,
  handlePasswordChange,
  setState,
}) => {
  return (
    <>
      <div className="loginSignup-container">
        <h1>Lấy lại mật khẩu</h1>
        {otpSent ? (
          <>
            <div className="loginSignup-fields">
              <input
                type="text"
                name="otpCode"
                placeholder="Nhập mã OTP"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
              />
              <input
                type="password"
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button onClick={handleOTPCheck}>Xác minh OTP</button>
            {success && (
              <button onClick={handleNewPasswordSave}>Cập nhật mật khẩu</button>
            )}
          </>
        ) : (
          <>
            <input
              className="reset"
              type="email"
              placeholder="Nhập email để nhận mã OTP"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <button onClick={handlePasswordChange}>Gửi mã OTP</button>
          </>
        )}
        <p className="loginSignup-login">
          Bạn đã nhớ mật khẩu?{" "}
          <span onClick={() => setState("login")}>Đăng nhập tại đây!</span>
        </p>
      </div>
    </>
  );
};

export default ResetPasswordForm;
