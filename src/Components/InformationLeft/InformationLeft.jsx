import moment from "moment";
import { useState } from "react";
import useUserHandler from "../../Hooks/Handler/useUserHandler";

const InformationLeft = ({ userInfo, setUserInfo }) => {
  const [newPassword, setNewPassword] = useState("");
  const {
    isEditing,
    handleEditClick,
    handleSaveClick,
    handlePasswordChange,
    otpSent,
    success,
    otpCode,
    setOtpCode,
    handleOTPCheck,
    handleNewPasswordSave,
  } = useUserHandler({
    userInfo,
    newPassword,
  });
  return (
    <>
      <h1 className="titlePage">Thông tin cá nhân</h1>
      <div className="information-main">
        <div className="information-item">
          {isEditing ? (
            <p>
              Tên tài khoản{" "}
              <input
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
            </p>
          ) : (
            <p>
              Tên tài khoản: <strong>{userInfo.name}</strong>
            </p>
          )}
        </div>
        <div className="information-item">
          {isEditing ? (
            <p>
              Tên người dùng:{" "}
              <input
                value={userInfo.fullname}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, fullname: e.target.value })
                }
              />
            </p>
          ) : (
            <p>
              Tên người dùng: <strong>{userInfo.fullname}</strong>
            </p>
          )}
        </div>
        <div className="information-item">
          {isEditing ? (
            <p>
              Số điện thoại:{" "}
              <input
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
              />
            </p>
          ) : (
            <p>
              Số điện thoại: <strong>{userInfo.phone}</strong>
            </p>
          )}
        </div>
        <div className="information-item">
          {isEditing ? (
            <p>
              Email:
              <input
                className="informationFields"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </p>
          ) : (
            <p>
              Email:
              <input
                className="informationFields"
                type="text"
                value={userInfo.email}
                readOnly
              />
            </p>
          )}
        </div>
        <div className="information-item">
          <p>
            Ngày tạo tài khoản:{" "}
            <strong>
              {moment.utc(userInfo.createdAt).format("hh:mm - DD/MM/YYYY")}
            </strong>
          </p>
        </div>
        {isEditing ? (
          <button onClick={handleSaveClick}>Lưu</button>
        ) : (
          <button onClick={handleEditClick}>Chỉnh sửa thông tin</button>
        )}
        {!otpSent ? (
          <button onClick={handlePasswordChange}>Đổi mật khẩu</button>
        ) : (
          <>
            <div
              style={{
                margin: "10px 0",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <label>Nhập mã OTP:</label>
              <input
                className="inputFields"
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength="6"
              />
              <button onClick={handleOTPCheck}>Kiểm tra OTP</button>
            </div>
            {success && (
              <div
                style={{
                  margin: "10px 0",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <label>Mật khẩu mới:</label>
                <input
                  className="inputFields"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button onClick={handleNewPasswordSave}>
                  Lưu mật khẩu mới
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default InformationLeft;
