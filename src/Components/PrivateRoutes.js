import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorage, STORAGE } from "../Utils/storage";

function PrivateRoutes() {
  const isAuth = getLocalStorage(STORAGE.USER_TOKEN) ? true : false;
  
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
