import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiHome, HiShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";
import LoginMenu from "./LoginMenu";
import Profile from "./Profile";
import Order from "../features/Order";

const StyledMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 40px;

  @media (max-width: 730px) {
    flex-flow: row;
    margin-top: 5rem;

    justify-content: space-around;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 4.5rem;
  }
  @media (max-width: 430px) {
    justify-content: center;
    margin-right: 25px;
  }
  @media (max-width: 300px) {
    padding: 5px;
  }
`;
const MenuItems = styled.h3`
  color: white;
  padding: 5px;
  margin-right: 10px;
  font-size: 33px;
`;
const StyledCount = styled.span`
  font-size: small;
  background-color: #ed006c;
  border-radius: 100%;
  border: 5px solid #ed006c;
`;
function Menu() {
  const navigate = useNavigate();

  const name = useSelector((store) => store.loginslice.name);
  const isloggedin = useSelector((store) => store.loginslice.isloggedin);

  return (
    <StyledMenu>
      <MenuItems onClick={() => navigate("/")}>
        <HiHome />
      </MenuItems>

      <MenuItems onClick={() => navigate("/cart")}>
        <HiShoppingCart />
      </MenuItems>
      <Order />
      <LoginMenu isloggedin={isloggedin} />
      <Profile name={name} />
    </StyledMenu>
  );
}

export default Menu;
