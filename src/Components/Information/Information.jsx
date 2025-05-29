import { useEffect, useState } from "react";
import "./Information.css";
import useUser from "../../Hooks/API/useUser";
import useAddressHandler from "../../Hooks/Handler/useAddressHandler";
import InformationLeft from "../InformationLeft/InformationLeft";
import InformationAddress from "../InformationAddress/InformationAddress";
import AddNewAddressForm from "../AddNewAddressForm/AddNewAddressForm";

const Information = () => {
  const {
    fetchData,
    error,
    provinces,
    loading,
    userInfo,
    addresses,
    setAddresses,
    setUserInfo,
  } = useUser();
  const [selectedWard, setSelectedWard] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const {
    handleProvinceChange,
    handleDistrictChange,
    handleAddNewAddress,
    handleDeleteAddress,
    selectedDistrict,
    selectedProvince,
    districts,
    wards,
  } = useAddressHandler({
    setSelectedWard,
    addresses,
    selectedWard,
    detailAddress,
    provinces,
    setAddresses,
    setDetailAddress,
  });

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Đang tải thông tin...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="information-container">
      {userInfo ? (
        <div className="information-wrapper">
          <div className="information-container-left">
            <InformationLeft userInfo={userInfo} setUserInfo={setUserInfo} />
          </div>
          <div className="information-container-right">
            <h1 className="titlePage">Thông tin giao hàng</h1>
            <InformationAddress
              addresses={addresses}
              handleDeleteAddress={handleDeleteAddress}
            />
            <AddNewAddressForm
              provinces={provinces}
              handleProvinceChange={handleProvinceChange}
              handleDistrictChange={handleDistrictChange}
              handleAddNewAddress={handleAddNewAddress}
              selectedDistrict={selectedDistrict}
              selectedProvince={selectedProvince}
              districts={districts}
              wards={wards}
              selectedWard={selectedWard}
              setSelectedWard={setSelectedWard}
              detailAddress={detailAddress}
              setDetailAddress={setDetailAddress}
            />
          </div>
        </div>
      ) : (
        <div className="no-user">Không tìm thấy thông tin người dùng!</div>
      )}
    </div>
  );
};

export default Information;
