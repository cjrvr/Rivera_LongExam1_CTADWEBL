import { Navigate } from "react-router-dom";
import {
  getCurrentUser,
  getToken,
} from "../services/authService";

const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {
  const token = getToken();
  const user = getCurrentUser();

  if (!token || !user) {
    return (
      <Navigate
        to="/auth/signin"
        replace
      />
    );
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;