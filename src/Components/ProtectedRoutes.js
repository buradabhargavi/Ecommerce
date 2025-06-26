
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  
   try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unAuth" replace />;
    }
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
