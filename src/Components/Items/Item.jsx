import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <Link to={`/product/${props.id}`} onClick={window.scrollTo(0, 0)}>
      <div className="item">
        {props.discount !== 0 && (
          <div className="discount-ribbon">
            <span>Giảm {props.discount}%</span>
          </div>
        )}
        <img src={props.image} alt={props.name} />
        <p className="title">{props.name}</p>
        <div className="prices" style={{ textAlign: "center" }}>
          {props.discount !== 0 ? (
            <div className="item-prices">
              <p className="old-prices">
                {props.prePrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
                /{props.weight}
                {props.unit}
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="item-prices">
            <p className="prices">
              {props.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
              /{props.weight}
              {props.unit}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
