import styled from "styled-components";
import Logo from "../ui/Logo";
import Login from "../features/Login";
import Signin from "../features/Signin";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const StyledPage = styled.div`
  background-color: #3d103c;
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10rem;
`;
const StyledLogo = styled.div`
  padding: 5rem;
`;
function LogSignIn() {
  const navigate = useNavigate();

  return (
    <StyledPage>
      <StyledLogo onClick={() => navigate("/")}>
        <Logo />
      </StyledLogo>
      <Outlet />
    </StyledPage>
  );
}

export default LogSignIn;
