import { useState } from "react";

const InformationAddress = ({ addresses, handleDeleteAddress }) => {
  const [hoveredAddress, setHoveredAddress] = useState("");
  return (
    <div className="information-address">
      {addresses.length > 0 ? (
        addresses.map((addr) => (
          <div
            key={addr._id}
            className={`information-addressesItem ${
              addr.isDefault ? "default-address" : ""
            }`}
            onMouseEnter={() => setHoveredAddress(addr._id)}
            onMouseLeave={() => setHoveredAddress(null)}
          >
            <span>
              {addr.detailAddress}, {addr.ward}, {addr.district},{" "}
              {addr.province}
            </span>
            {hoveredAddress === addr._id && (
              <button
                className="delete-button"
                onClick={() => handleDeleteAddress(addr._id)}
              >
                Xóa
              </button>
            )}
          </div>
        ))
      ) : (
        <div className="no-address">Chưa có địa chỉ nào!</div>
      )}
    </div>
  );
};

export default InformationAddress;
