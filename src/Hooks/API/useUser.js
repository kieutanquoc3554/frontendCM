import axios from "axios";
import { useState } from "react";

export default function useUser() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tk");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data: userData } = await axios.get(
        "https://backendlvtn.onrender.com/users/info",
        config
      );
      setUserInfo(userData);

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
      const { data: addressData } = await axios.get(
        `https://backendlvtn.onrender.com/users/getAddress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddresses(addressData.addresses);
      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data.message || "Lỗi khi lấy thông tin người dùng"
      );
      setLoading(false);
    }
  };

  return {
    fetchData,
    error,
    provinces,
    loading,
    userInfo,
    addresses,
    setAddresses,
    setUserInfo,
  };
}
