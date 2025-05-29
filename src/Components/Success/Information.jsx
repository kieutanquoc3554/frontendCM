import ConfirmLeft from "./ConfirmLeft";
import ConfirmRight from "./ConfirmRight";

const Information = ({ orderInfo, paymentMethodName }) => {
  return (
    <div className="confirm-info">
      <ConfirmLeft
        orderInfo={orderInfo}
        paymentMethodName={paymentMethodName}
      />
      <ConfirmRight orderInfo={orderInfo} />
    </div>
  );
};

export default Information;
