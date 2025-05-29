import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component }) => {
  const token = localStorage.getItem("tk");
  return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
