import React, { useState } from "react";

const StarRating = ({ rate, onRateChange }) => {
  const stars = Array(5).fill(0);

  return (
    <div className="starRating">
      {stars.map((_, index) => (
        <span
          key={index}
          className={index < rate ? "star filled" : "star"}
          onClick={() => onRateChange(index + 1)} // Cập nhật số sao khi người dùng click
          style={{ cursor: "pointer" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
