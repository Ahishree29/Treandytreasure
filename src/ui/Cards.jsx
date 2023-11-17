import { Link } from "react-router-dom";
import styled from "styled-components";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Styledcard = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: ${(props) => props.color};
  height: 25rem;
  width: 25rem;
  margin: 30px;
  border-radius: 10px;
  box-shadow: 4px 4px 4px ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  padding: 20px;
  @media (max-width: 510px) {
    width: 20rem;
  }
  @media (max-width: 430px) {
    width: 15rem;
    display: flex;
    flex-direction: column;
    height: auto;
  }
  @media (max-width: 350px) {
    width: 10rem;
    height: auto;
  }
  @media (max-width: 280px) {
    width: 8rem;
    height: auto;
  }
`;

const Image = styled.img`
  height: 25rem;
  @media (max-width: 350px) {
    height: 15rem;
  }
  @media (max-width: 380px) {
    height: 10rem;
  }
`;

const Button = styled.button`
  background-color: black;
  color: white;
  width: 5rem;
  height: 2.5rem;
  border-radius: 15px;
  margin-left: auto;
`;
const GenderStyle = styled.span`
  color: white;
  font-size: 1.5rem;
  @media (max-width: 510px) {
    font-size: 1rem;
  }
`;

function Cards({ Gender, bgColor, image }) {
  return (
    <CenteredContainer>
      <Styledcard color={bgColor}>
        <GenderStyle>{Gender.toUpperCase()}</GenderStyle>
        <Image src={image} alt={Gender} />
        <Link to={`/products?gender=${Gender}`}>
          <Button>{Gender}</Button>
        </Link>
      </Styledcard>
    </CenteredContainer>
  );
}

export default Cards;
