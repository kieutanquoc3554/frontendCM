import React, { useContext, useEffect, useState } from "react";
import "./Checkout.css";
import axios from "axios";
import { ShopContext } from "../../Context/ShopContext";
import { PayPalButton } from "react-paypal-button-v2";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import Success from "../Success/Success";
import Fail from "../Fail/Fail";
import { useLocation } from "react-router-dom";
import usePromotions from "../../Hooks/API/usePromotions";

const Checkout = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [productNames, setProductNames] = useState({});
  const {
    formatCurrency,
    getTotalCartAmount,
    type,
    discountedAmount,
    code,
    applyDiscount,
    setCode,
  } = useContext(ShopContext);
  const [isAppliedPromotion, setIsAppliedPromotion] = useState(false);
  const [payment, setPayment] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [order, setOrder] = useState({});
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState({
    detailAddress: "",
    ward: "",
    district: "",
    province: "",
  });

  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);
  const location = useLocation();
  const { availablePromotions, getApplicablePromotions } = usePromotions({
    getTotalCartAmount,
    selectedPayment,
  });

  useEffect(() => {
    const handleResetPromotion = async () => {
      try {
        if (code) {
          await axios.post(
            `https://backendlvtn.onrender.com/promotions/reset/${code}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("tk")}`,
              },
            }
          );
          console.log("Đã hoàn lại khuyến mãi");
        }
      } catch (error) {
        console.error("Lỗi khi hoàn mã:", error);
      }
    };

    const handlePathChange = () => {
      if (location.pathname !== "/cart/checkout" && !orderSuccess) {
        handleResetPromotion();
      }
    };
    window.addEventListener("popstate", handlePathChange);
    return () => {
      window.removeEventListener("popstate", handlePathChange);
    };
  }, [code, orderSuccess]);

  const handleApplyPromotion = async () => {
    if (!selectedPromotion) {
      toast.error("Vui lòng chọn một khuyến mãi");
      return;
    }
    try {
      const response = await axios.post(
        "https://backendlvtn.onrender.com/promotions/apply",
        {
          name: selectedPromotion.name,
          purchaseAmount: getTotalCartAmount(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );

      if (response.status === 200) {
        applyDiscount(
          selectedPromotion.discountValue,
          selectedPromotion.discountType,
          selectedPromotion.maxDiscountAmount
        );
        toast.success("Khuyến mãi đã được áp dụng");
        setIsAppliedPromotion(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data.message || "Có lỗi xảy ra khi áp dụng khuyến mãi."
      );
      setIsAppliedPromotion(false);
    }
  };

  useEffect(() => {
    getApplicablePromotions();
  }, [getTotalCartAmount, selectedPayment]);

  const handleOpenAddressModel = () => {
    setIsAddressModalOpen(!isAddressModalOpen);
  };

  const isAddressSelected = () => {
    return (
      selectedAddress.detailAddress &&
      selectedAddress.ward &&
      selectedAddress.district &&
      selectedAddress.province
    );
  };

  const createOrder = async () => {
    try {
      if (!isAddressSelected()) {
        return toast.error("Bạn chưa chọn địa chỉ nhận hàng");
      }
      const shippingFee = calculateShippingFee(cartItems);
      const token = localStorage.getItem("tk");

      const configuration = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const orderInfo = {
        userId: userInfo._id,
        name: userInfo.fullname,
        address: `${selectedAddress.detailAddress}, ${selectedAddress.ward}, ${selectedAddress.district}, ${selectedAddress.province}`,
        phone: userInfo.phone,
        email: userInfo.email,
        total: type
          ? discountedAmount + calculateShippingFee(cartItems)
          : getTotalCartAmount() + calculateShippingFee(cartItems),

        paymentMethod: paymentId,
        orders: cartItems.map((item) => ({
          productId: item.productId,
          name: productNames[item.productId] || item.productId,
          quantity: item.quantity,
          price: item.price,
          weight: item.weight,
          unit: item.unit,
          discount: item.discount || 0,
        })),
        discount: 0,
        shipping_fee: shippingFee,
        promotionId: selectedPromotion?._id || null,
        order_date: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Ho_Chi_Minh",
        }),
      };

      const response = await axios.post(
        "https://backendlvtn.onrender.com/orders/add",
        orderInfo,
        configuration
      );

      setOrder(response.data.order);
      setOrderSuccess(true);
      const randomDelay = Math.floor(Math.random() * 2 + 1) * 1000;
      setTimeout(() => {
        setOrderSuccess(true);
      }, randomDelay);
    } catch (error) {
      toast.error(error.response?.data?.message || "Đặt hàng thất bại!");
      console.log(error);
    }
  };

  const renderPaymentName = (name) => {
    switch (name) {
      case "cash":
        name = "Thanh toán bằng tiền mặt";
        break;
      case "paypal":
        name = "Thanh toán trực tuyến bằng Paypal";
        break;
      case "zalo":
        name = "Thanh toán trực tuyến bằng ZaloPay";
        break;
      default:
        break;
    }
    return name;
  };

  const fetchPaymentMethod = async () => {
    const response = await axios.get(
      "https://backendlvtn.onrender.com/payments/all"
    );
    setPayment(response.data);
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("tk");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        "https://backendlvtn.onrender.com/users/info",
        config
      );

      setUserInfo(data);

      const { data: provinceData } = await axios.post(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Token: "5679f116-91e5-11ef-85af-6e018fbc8600",
          },
        }
      );
      const sortedProvinces = provinceData.data.sort((a, b) =>
        a.ProvinceName.localeCompare(b.ProvinceName)
      );
      setProvinces(sortedProvinces);
    } catch (error) {
      setError(
        error.response?.data.message || "Lỗi khi lấy thông tin người dùng"
      );
    }
  };

  useEffect(() => {
    fetchPaymentMethod();
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("tk");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const userId = userInfo._id;
        if (userId) {
          const { data } = await axios.get(
            `https://backendlvtn.onrender.com/carts/getCart`,
            config
          );
          setCartItems(data.items);
        }
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
        setError("Có lỗi xảy ra khi lấy giỏ hàng.");
      }
    };
    if (userInfo) {
      fetchCartItems();
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchProductNames = async () => {
      const names = {};
      for (const item of cartItems) {
        try {
          const { data } = await axios.get(
            `https://backendlvtn.onrender.com/products/${item.productId}`
          );
          names[item.productId] = data.product.name;
        } catch (error) {
          console.error("Lỗi khi lấy tên sản phẩm:", error);
        }
      }
      setProductNames(names);
    };

    if (cartItems.length > 0) {
      fetchProductNames();
    }
  }, [cartItems]);

  const addPaypalScript = async () => {
    const { data } = await axios.get(
      "https://backendlvtn.onrender.com/payments/config"
    );
    const script = document.createElement("script");
    script.type = "/text/javascript";
    script.src = `https://sandbox.paypal.com/sdk/js?client-id=${data.data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (orderSuccess) {
    return <Success orderInfo={order} />;
  }

  if (isPaymentFailed) {
    return <Fail />;
  }

  const convertToGrams = (weight, unit) => {
    switch (unit) {
      case "kg":
        return weight * 1000;
      case "g":
        return weight;
      case "ml":
        return weight * 1;
      case "l":
        return weight * 1000;
      default:
        return 0;
    }
  };

  const calculateShippingFee = (cartItems) => {
    let totalWeightInGrams = 0;
    cartItems.forEach((item) => {
      const weightInGrams = convertToGrams(item.weight, item.unit);
      totalWeightInGrams += weightInGrams * item.quantity;
    });

    const totalWeightInKg = totalWeightInGrams / 1000;

    if (totalWeightInKg < 1) {
      return 0;
    } else {
      const additionalKg = Math.ceil(totalWeightInKg - 1);
      return 10000 + additionalKg * 5000;
    }
  };

  const checkPaymentStatus = async (app_trans_id) => {
    if (isPaymentSuccessful || isPaymentFailed) return;

    try {
      const response = await axios.post(
        `https://backendlvtn.onrender.com/payments/check/${app_trans_id}`
      );
      if (response.data.return_code === 1) {
        if (!isPaymentSuccessful) {
          setIsPaymentSuccessful(true);
          toast.success("Thanh toán thành công!");
          setOrderSuccess(true);
          await createOrder();
          return true;
        }
      } else if (response.data.return_code === 2) {
        if (!isPaymentFailed) {
          setIsPaymentFailed(true);
          toast.error("Thanh toán thất bại. Vui lòng kiểm tra lại!");
          return true;
        }
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái thanh toán:", error);
      toast.error("Có lỗi xảy ra khi kiểm tra trạng thái thanh toán.");
    }
  };

  const startPaymentStatusCheck = (trans_id) => {
    const intervalId = setInterval(async () => {
      const isPaymentSuccessful = await checkPaymentStatus(trans_id);
      if (isPaymentSuccessful) {
        clearInterval(intervalId);
      }
    }, 3000);
  };

  const handlePayByZalo = async () => {
    try {
      if (
        !selectedAddress.ward ||
        !selectedAddress.province ||
        !selectedAddress.district ||
        !selectedAddress.detailAddress
      ) {
        return toast.error("Địa chỉ giao hàng chưa được chọn vui lòng thử lại");
      }
      const shippingFee = calculateShippingFee(cartItems);

      const items = {
        userId: userInfo._id,
        name: userInfo.fullname,
        address: selectedAddress,
        phone: userInfo.phone,
        email: userInfo.email,
        total: type
          ? discountedAmount + calculateShippingFee(cartItems)
          : getTotalCartAmount() + calculateShippingFee(cartItems),
        paymentMethod: paymentId,
        orders: cartItems.map((item) => ({
          productId: item.productId,
          name: productNames[item.productId] || item.productId,
          quantity: item.quantity,
          price: item.price,
          weight: item.weight,
          unit: item.unit,
          discount: item.discount || 0,
        })),
        discount: 0,
        shipping_fee: shippingFee,
      };

      const response = await axios.post(
        "https://backendlvtn.onrender.com/payments/payment",
        items
      );
      if (response.data.data.return_code === 1) {
        const order_url = response.data.data.order_url;
        if (order_url) {
          const paymentPopup = window.open(
            order_url,
            "ZaloPayPayment",
            "width=600,height=800"
          );
          const interval = setInterval(async () => {
            if (paymentPopup.closed) {
              clearInterval(interval);
              await checkPaymentStatus(response.data.trans_id);
            }
          }, 1000);
        } else {
          toast.error("Không có URL để thanh toán!");
        }
      } else {
        toast.error("Thanh toán không thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      toast.error("Có lỗi xảy ra khi thanh toán.");
    }
  };

  const handleProvinceChange = async (e) => {
    const province_id = e.target.value;
    setSelectedProvince(province_id);
    setSelectedDistrict("");
    setSelectedWard("");
    try {
      const response = await axios.post(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
        {
          province_id: Number(province_id),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Token: "5679f116-91e5-11ef-85af-6e018fbc8600",
          },
        }
      );
      const sortedDistrict = response.data.data.sort((a, b) =>
        a.DistrictName.localeCompare(b.DistrictName)
      );
      setDistricts(sortedDistrict);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quận:", error);
    }
  };

  const handleDistrictChange = async (e) => {
    const district_id = e.target.value;
    setSelectedDistrict(district_id);
    setSelectedWard("");
    try {
      const response = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Token: "5679f116-91e5-11ef-85af-6e018fbc8600",
          },
        }
      );
      const sortedWard = response.data.data.sort((a, b) =>
        a.WardName.localeCompare(b.WardName)
      );
      setWards(sortedWard);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phường:", error);
    }
  };

  const handleAddNewAddress = async () => {
    if (
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard ||
      !detailAddress
    ) {
      return alert("Vui lòng điền đầy đủ thông tin địa chỉ!");
    }

    try {
      const newAddress = {
        province: provinces.find(
          (p) => p.ProvinceID === Number(selectedProvince)
        )?.ProvinceName,
        district: districts.find(
          (p) => p.DistrictID === Number(selectedDistrict)
        )?.DistrictName,
        ward: wards.find((p) => p.WardCode === selectedWard)?.WardName,
        detailAddress,
        isDefault: false,
      };

      await axios.post(
        `https://backendlvtn.onrender.com/users/addAddress`,
        newAddress,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );
      setDetailAddress("");
      setSelectedProvince("");
      setSelectedDistrict("");
      setSelectedWard("");
    } catch (error) {
      console.error("Lỗi khi thêm địa chỉ:", error);
      alert("Không thể thêm địa chỉ, vui lòng thử lại sau!");
    }
  };
  return (
    <div style={{ padding: "40px", width: "75%", margin: "10px auto" }}>
      <h1 style={{ textAlign: "center" }}>Xác nhận thanh toán</h1>
      <div className="checkout-container">
        <div className="checkout-left">
          <div className="checkout-left-info">
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Icon fontSize={30} icon="solar:user-id-bold-duotone"></Icon>Thông
              tin khách hàng
            </h3>
            <div className="checkout-left-infoItems">
              <p>
                Tên khách hàng: <strong>{userInfo?.fullname}</strong>
              </p>
            </div>
            <div className="checkout-left-infoItems">
              <p>
                Số điện thoại: <strong>{userInfo?.phone}</strong>
              </p>
            </div>
            <div className="checkout-left-infoItems">
              <p>
                Email: <strong>{userInfo?.email}</strong>
              </p>
            </div>
            <div className="checkout-left-infoItems">
              <p>
                <div className="checkout-left-infoItems">
                  <p>
                    Địa chỉ giao hàng:{" "}
                    {userInfo?.addresses?.length > 0 && (
                      <strong>
                        Bạn có {userInfo?.addresses?.length} địa chỉ
                      </strong>
                    )}
                    {userInfo?.addresses?.length > 0 ? (
                      userInfo.addresses.map((address, index) => (
                        <div
                          className={`addresses ${
                            selectedAddress.detailAddress ===
                              address.detailAddress &&
                            selectedAddress.ward === address.ward &&
                            selectedAddress.district === address.district &&
                            selectedAddress.province === address.province
                              ? "active"
                              : ""
                          }`}
                          key={index}
                          onClick={() =>
                            setSelectedAddress({
                              detailAddress: address.detailAddress,
                              ward: address.ward,
                              district: address.district,
                              province: address.province,
                            })
                          }
                        >
                          <input type="radio" name="address" id="" />
                          <strong>
                            {address.detailAddress}, {address.ward},{" "}
                            {address.district}, {address.province}
                          </strong>
                        </div>
                      ))
                    ) : (
                      <strong>Chưa có địa chỉ</strong>
                    )}
                  </p>
                </div>
                <button className="newAddress" onClick={handleOpenAddressModel}>
                  {isAddressModalOpen ? "Huỷ thêm địa chỉ" : "Thêm địa chỉ mới"}
                </button>
              </p>
            </div>
          </div>
          {isAddressModalOpen && (
            <div className="add-address-modal">
              <h3>Thêm địa chỉ mới</h3>
              <div className="address-selectors">
                <select
                  onChange={handleProvinceChange}
                  value={selectedProvince}
                >
                  <option value="">Chọn tỉnh</option>
                  {provinces.map((province) => (
                    <option
                      key={province.ProvinceID}
                      value={province.ProvinceID}
                    >
                      {province.ProvinceName}
                    </option>
                  ))}
                </select>

                <select
                  onChange={handleDistrictChange}
                  value={selectedDistrict}
                >
                  <option value="">Chọn quận</option>
                  {districts.map((district) => (
                    <option
                      key={district.DistrictID}
                      value={district.DistrictID}
                    >
                      {district.DistrictName}
                    </option>
                  ))}
                </select>

                <select
                  onChange={(e) => setSelectedWard(e.target.value)}
                  value={selectedWard}
                >
                  <option value="">Chọn phường</option>
                  {wards.map((ward) => (
                    <option key={ward.WardCode} value={ward.WardCode}>
                      {ward.WardName}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Địa chỉ chi tiết"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                />
              </div>

              <button className="add" onClick={handleAddNewAddress}>
                Thêm địa chỉ
              </button>
            </div>
          )}

          <hr />
          <div>
            <h3>Khuyến mãi hiện đang có:</h3>
            {availablePromotions.map((promo) => (
              <div
                key={promo._id}
                className={`promotions ${
                  promo.isApplicable ? "" : "disabled-promo"
                }`}
              >
                <label>
                  <input
                    type="radio"
                    name="promotion"
                    value={promo._id}
                    onChange={() =>
                      promo.isApplicable && setSelectedPromotion(promo)
                    }
                    disabled={!promo.isApplicable}
                  />
                  <span>{promo.name}</span> - Giảm {promo.discountValue}{" "}
                  {promo.discountType === "percentage" ? "%" : "VND"}
                </label>
                {!promo.isApplicable && (
                  <div className="reasons">
                    {promo.reasons.map((reason, index) => (
                      <p key={index} style={{ color: "red" }}>
                        {reason}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={handleApplyPromotion}
              disabled={!selectedPromotion}
            >
              Áp dụng
            </button>
          </div>
        </div>
        <div className="checkout-right">
          <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Icon width={30} icon="solar:bill-check-bold-duotone"></Icon>
            Thông tin đơn hàng
          </h3>
          <div>
            {Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="checkout-right-container">
                  <div className="checkout-right-item">
                    <div className="name">
                      <strong>
                        {productNames[item.productId] || item.productId}
                      </strong>
                      {item.discount !== 0 && (
                        <div className="discount">Giảm {item.discount}%</div>
                      )}
                    </div>
                    <div className="detailProduct">
                      <p>
                        Số lượng: <strong>{item.quantity}</strong>
                      </p>
                      <p>
                        Trọng lượng:{" "}
                        <strong>
                          {item.weight} {item.unit}
                        </strong>
                      </p>
                      <p>
                        Giá sản phẩm:{" "}
                        <strong>{formatCurrency(item.price)}</strong>
                      </p>
                      <p>
                        Thành tiền:{" "}
                        <strong>
                          {formatCurrency(item.price * item.quantity)}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Giỏ hàng trống.</p>
            )}
          </div>
          <div>
            <h3
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                margin: 0,
              }}
            >
              Tổng đơn hàng:{" "}
              <strong style={{ color: "red" }}>
                {type ? (
                  <h3 style={{ margin: 0 }}>
                    {formatCurrency(discountedAmount)}
                  </h3>
                ) : (
                  <h3 style={{ margin: "10px 0" }}>
                    {formatCurrency(getTotalCartAmount())}
                  </h3>
                )}
              </strong>
            </h3>
            <h3 style={{ margin: 0 }}>
              Phí vận chuyển:{" "}
              <strong style={{ color: "red", margin: 0 }}>
                {formatCurrency(calculateShippingFee(cartItems))}
              </strong>
            </h3>
            <hr />
            <h3
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                margin: 0,
              }}
            >
              Tổng thanh toán:{" "}
              <strong style={{ color: "red" }}>
                {/* {formatCurrency(
                  getTotalCartAmount() + calculateShippingFee(cartItems)
                )} */}
                {type ? (
                  <h3 style={{ margin: 0 }}>
                    {formatCurrency(
                      discountedAmount + calculateShippingFee(cartItems)
                    )}
                  </h3>
                ) : (
                  <h3 style={{ margin: 0 }}>
                    {formatCurrency(
                      getTotalCartAmount() + calculateShippingFee(cartItems)
                    )}
                  </h3>
                )}
              </strong>
            </h3>
          </div>
          <hr />
          <div className="checkout-left-info">
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Icon width={30} icon="solar:money-bag-bold-duotone"></Icon>
              Thông tin thanh toán
            </h3>
            <div className="checkout-left-infoMethodPayment">
              {payment.map((payments, index) => (
                <div className="paymentMethods" key={index}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={payments._id}
                    onClick={() => {
                      setPaymentId(payments._id);
                      setSelectedPayment(payments.name);
                    }}
                  />
                  <span>{renderPaymentName(payments.name)}</span>
                </div>
              ))}
            </div>
          </div>
          {selectedPayment === "zalo" && (
            <div className="paymentButton-zalo" onClick={handlePayByZalo}>
              <img
                style={{ width: "80px" }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe6SEQ293X0nfFojf6nsCWKA8dNGOrqn21jg&s"
                alt=""
              />
              <strong>Thanh toán qua ZaloPay</strong>
            </div>
          )}
          {selectedPayment === "paypal" && (
            <div className="paymentButton">
              <PayPalButton
                amount={getTotalCartAmount / 24770}
                createOrder={(data, actions) => {
                  if (
                    !selectedAddress.ward ||
                    !selectedAddress.province ||
                    !selectedAddress.district ||
                    !selectedAddress.detailAddress
                  ) {
                    return toast.error(
                      "Địa chỉ giao hàng chưa được chọn vui lòng thử lại"
                    );
                  }
                  if (userInfo.addresses.length === 0) {
                    return toast.error("Vui lòng thêm địa chỉ giao hàng");
                  }
                  if (
                    !userInfo.email ||
                    !userInfo.fullname ||
                    !userInfo.phone
                  ) {
                    return toast.error(
                      "Thông tin giao hàng chưa đầy đủ, vui lòng kiểm tra lại"
                    );
                  }
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: (getTotalCartAmount() / 24770).toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onSuccess={async (details, data) => {
                  alert(
                    "Transaction completed by " + details.payer.name.given_name
                  );
                  await createOrder();

                  return fetch("/paypal-transaction-complete", {
                    method: "post",
                    body: JSON.stringify({
                      orderID: data.orderID,
                    }),
                  });
                }}
                onError={() => {
                  setIsPaymentFailed(true);
                }}
              />
            </div>
          )}
          {selectedPayment !== "zalo" && selectedPayment !== "paypal" && (
            <button className="submitButton" onClick={createOrder}>
              Xác nhận đơn hàng
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
