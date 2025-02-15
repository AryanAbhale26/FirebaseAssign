import { Navigate, Outlet } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";

const AdminRoute = () => {
  const { user } = useFirebase();

  // Restrict Access if No Admin is Logged In
  return user ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminRoute;
