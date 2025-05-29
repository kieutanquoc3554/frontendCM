import React, { useState } from "react";
import "../Pages/CSS/loginSignup.css";
import { GoogleLogin } from "@react-oauth/google";
import useLoginSignupHandler from "../Hooks/Handler/useLoginSignupHandler";
import AdditionalInformation from "../Components/AdditionalInformation/AdditionalInformation";
import LoginForm from "../Components/LoginForm/LoginForm";
import LoginSignupFooter from "../Components/LoginSignUpFooter/LoginSignUpFooter";
import SignUpForm from "../Components/SignupForm/SignupForm";
import ResetPasswordForm from "../Components/ResetPasswordForm/ResetPasswordForm";

const LoginSignup = () => {
  const [state, setState] = useState("login");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const {
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
  } = useLoginSignupHandler({
    otpCode,
    resetEmail,
    newPassword,
  });

  return (
    <div className="loginSignup">
      {isAdditionalInfoRequired ? (
        <AdditionalInformation
          formData={formData}
          handleInputChange={handleInputChange}
          handleAdditionalInfoSubmit={handleAdditionalInfoSubmit}
        />
      ) : (
        <>
          {state === "login" && (
            <div className="loginSignup-container">
              <LoginForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleLogin={handleLogin}
              />
              <GoogleLogin onSuccess={onSuccess} onFailure={onFailure} />
              <LoginSignupFooter setState={setState} />
            </div>
          )}
          {state === "signup" && (
            <SignUpForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSignUp={handleSignUp}
              setState={setState}
            />
          )}
          {state === "resetPassword" && (
            <ResetPasswordForm
              otpSent={otpSent}
              otpCode={otpCode}
              setOtpCode={setOtpCode}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              handleOTPCheck={handleOTPCheck}
              handleNewPasswordSave={handleNewPasswordSave}
              resetEmail={resetEmail}
              setResetEmail={setResetEmail}
              success={success}
              handlePasswordChange={handlePasswordChange}
              setState={setState}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LoginSignup;
