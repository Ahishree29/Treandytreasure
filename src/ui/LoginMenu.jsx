import styled from "styled-components";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedin } from "../Redux/loginslice";
import { BaseUrl } from "../helper";

const MenuItems = styled.h3`
  color: white;
  padding: 5px;
  margin-right: 10px;
  font-size: 33px;
`;
function LoginMenu({ isloggedin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }
  async function handleLogout() {
    try {
      const response = await fetch(`${BaseUrl}/api/logout`, {
        method: "POST",
      });

      if (response.ok) {
        localStorage.removeItem("user", "token", "userid");

        localStorage.clear();
        dispatch(loggedin(false));
        navigate("/");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  return (
    <MenuItems>
      {!isloggedin ? (
        <div onClick={handleLogin}>
          <HiOutlineLogin />
        </div>
      ) : (
        <div onClick={handleLogout}>
          {" "}
          <HiOutlineLogout />
        </div>
      )}
    </MenuItems>
  );
}

export default LoginMenu;
