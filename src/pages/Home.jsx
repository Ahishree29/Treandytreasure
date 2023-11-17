import styled from "styled-components";
import CardCategories from "../features/CardCategories";
const StyledHome = styled.main`
  overflow-y: scroll;
  padding-top: 8rem;

  padding-bottom: 20rem;
  @media (max-width: 730px) {
    padding-top: 12rem;
  }
`;
const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;
const HeaderText = styled.div`
  color: #a55b2a;
  font-style: italic;
  font-size: 2rem;
  font-weight: bolder;

  padding: 2rem;
  @media (max-width: 767px) {
    font-size: 1.5rem;
  }
  @media (max-width: 607px) {
    font-size: 1rem;
  }
`;

const SecondText = styled.div`
  color: wheat;
  font-style: italic;
  font-size: 2rem;
  @media (max-width: 1700px) {
    display: none;
  }
`;
function Home() {
  return (
    <StyledHome>
      <StyledText>
        <HeaderText>Explore Your Style Journey with Trendy Treasure</HeaderText>
        <SecondText>
          From timeless classics to the latest trends, find your perfect style
          among our curated selections for men, women, girls, and boys.
        </SecondText>
      </StyledText>
      <CardCategories />
      <StyledText>
        <SecondText>
          Incredible quality and style! Trendy Treasure never disappoints.
        </SecondText>
        <SecondText>
          At Trendy Treasure, we're dedicated to bringing you the finest
          clothing choices, inspired by passion and a commitment to style.
        </SecondText>
      </StyledText>
    </StyledHome>
  );
}

export default Home;
