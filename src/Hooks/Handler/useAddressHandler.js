import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useAddressHandler({
  setSelectedWard,
  addresses,
  selectedWard,
  detailAddress,
  provinces,
  setAddresses,
  setDetailAddress,
}) {
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleProvinceChange = async (e) => {
    const province_id = e.target.value;
    setSelectedProvince(province_id);
    setSelectedDistrict("");
    setSelectedWard("");
    try {
      const response = await axios.post(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
        { province_id: Number(province_id) },
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
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setSelectedWard("");
    try {
      const response = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
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

      setAddresses([...addresses, newAddress]);
      setDetailAddress("");
      setSelectedProvince("");
      setSelectedDistrict("");
      setSelectedWard("");
    } catch (error) {
      console.error("Lỗi khi thêm địa chỉ:", error);
      alert("Không thể thêm địa chỉ, vui lòng thử lại sau!");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(
        `https://backendlvtn.onrender.com/users/delete/address/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tk")}`,
          },
        }
      );
      setAddresses(addresses.filter((addr) => addr._id !== addressId));
      toast.success("Đã xóa địa chỉ thành công!");
    } catch (error) {
      toast.error("Lỗi khi xóa địa chỉ");
    }
  };

  return {
    handleProvinceChange,
    handleDistrictChange,
    handleAddNewAddress,
    handleDeleteAddress,
    selectedDistrict,
    selectedProvince,
    districts,
    wards,
  };
}
