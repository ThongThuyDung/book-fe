import Header from "./Components/Header"; //Include Header
import Footer from "./Components/Footer"; //Include Footer
import Home from "./Layouts/Home/Home";
import SingleProduct from "./Layouts/Detail/SingleProduct";
import Checkout from "./Layouts/Process/Checkout";
import Cart from "./Layouts/Cart/Cart";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoutes from "./Components/PrivateRoutes";
import { getLocalStorage, STORAGE } from "./Utils/storage";
import NotFound from "./Components/NotFound";
import Seller from "./Layouts/Seller/Seller";
import { useLocation } from "react-router-dom";
import PermanentDrawerLeft from "./Layouts/Profile/SideBar";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer,toast } from "react-toastify";

function App() {
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const [listItemChosen, setListItemChosen] = useState([]);
  return (
    <div className="App">
      <div className="position-relative">
        {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/seller" &&
        location.pathname !== "/my_account" ? (
          <>
            {" "}
            <Header setKeyword={setKeyword} keyword={keyword}></Header>{" "}
          </>
        ) : (
          <></>
        )}
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/checkout"
              element={
                listItemChosen.length > 0 ? (
                  <Checkout listItemChosen={listItemChosen} />
                ) : (
                  <Navigate to="/cart" />
                )
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  setListItemChosen={setListItemChosen}
                  listItemChosen={listItemChosen}
                />
              }
            />
            <Route path="/my_account" element={<PermanentDrawerLeft />} />
          </Route>
          <Route path="/" element={<Home keyword={keyword} />} />
          <Route path="/Home" element={<Home keyword={keyword} />}></Route>
          <Route
            // exact
            path="/detail-product/:productId"
            element={<SingleProduct />}
          ></Route>

          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/notfound" />} />
          {getLocalStorage(STORAGE.USER_TOKEN) ? (
            <Route>
              <Route path="/login" element={<Navigate to="/home" />} />
              <Route path="/signup" element={<Navigate to="/home" />} />
              <Route
                path="/forgot-password"
                element={<Navigate to="/home" />}
              />
            </Route>
          ) : (
            <Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
          )}
          <Route path="/seller" element={<Seller />} />
        </Routes>
        {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/seller" &&
        location.pathname !== "/my_account" ? (
          <>
            {" "}
            <Footer></Footer>{" "}
          </>
        ) : (
          <></>
        )}
      </div>
      <ToastContainer />
      
      
    </div>
  );
}
export default App;
