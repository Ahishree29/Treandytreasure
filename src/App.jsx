import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Products from "./pages/Products";
import PageNotFound from "./ui/PageNotFound";
import { useEffect, useState } from "react";
import Cart from "./pages/Cart";
import { useGetCart } from "./Hook/useGetCart";
import { useDispatch, useSelector } from "react-redux";
import { cartcount } from "./Redux/cartslice";
import Login from "./features/Login";
import LogSignIn from "./pages/LogSignIn";
import Signin from "./features/Signin";
import { loggedin, loginUser, logiuserId } from "./Redux/loginslice";
import MyOrder from "./pages/MyOrder";
import { Toaster } from "react-hot-toast";

function App() {
  const [selectedGender, setSelectedGender] = useState("");

  const dispatch = useDispatch();
  const { count } = useGetCart();

  useEffect(
    function () {
      dispatch(cartcount(count));
    },
    [count]
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route
              path="products"
              element={<Products selectedGender={selectedGender} />}
            />
            <Route path="cart" element={<Cart />} />
            <Route path="myorder" element={<MyOrder />} />
          </Route>
          <Route element={<LogSignIn />}>
            <Route path="login" element={<Login />} />
            <Route path="signin" element={<Signin />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={1}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: {
            duration: 8000,
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px,24px",
              backgroundColor: "white",
              color: "var(--color-grey-0)",
            },
          },
        }}
      />
    </>
  );
}

export default App;
