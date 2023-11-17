import styled from "styled-components";

const StyleLogo = styled.img`
  height: 6.5rem;
  @media (max-width: 500px) {
    width: 10rem;
    height: 5rem;
    padding-bottom: 1rem;
  }
  @media (max-width: 730px) {
    width: 11rem;
    height: 5rem;
  }
`;
function Logo() {
  return (
    <div>
      <StyleLogo src="./logo.png" alt="logo"></StyleLogo>
    </div>
  );
}

export default Logo;
