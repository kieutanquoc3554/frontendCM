const AddNewAddressForm = ({
  provinces,
  handleProvinceChange,
  handleDistrictChange,
  handleAddNewAddress,
  selectedDistrict,
  selectedProvince,
  districts,
  wards,
  selectedWard,
  setSelectedWard,
  detailAddress,
  setDetailAddress,
}) => {
  return (
    <div className="add-address-form">
      <h3>Thêm địa chỉ mới</h3>
      <div className="address-selectors">
        <select onChange={handleProvinceChange} value={selectedProvince}>
          <option value="">Chọn tỉnh</option>
          {provinces.map((province) => (
            <option key={province.ProvinceID} value={province.ProvinceID}>
              {province.ProvinceName}
            </option>
          ))}
        </select>

        <select onChange={handleDistrictChange} value={selectedDistrict}>
          <option value="">Chọn quận</option>
          {districts.map((district) => (
            <option key={district.DistrictID} value={district.DistrictID}>
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
  );
};

export default AddNewAddressForm;
