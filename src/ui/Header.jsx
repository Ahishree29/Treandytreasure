import styled from "styled-components";
import Logo from "./Logo";
import Menu from "./Menu";

const StyleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  position: fixed;
  width: 100%;
  background-color: #690759;
  z-index: 1000;
  top: 0;

  @media (max-width: 730px) {
    height: 10rem;
    justify-content: center;
    padding-top: 2rem;
  }
`;
function Header() {
  return (
    <StyleHeader>
      <Logo />
      <Menu />
    </StyleHeader>
  );
}

export default Header;
