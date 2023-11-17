import styled from "styled-components";

const PageStyle = styled.div`
  width: auto;
  color: #a5612a;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  padding-top: 20rem;
  padding-bottom: 50rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 730px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 1rem;
  }
  @media (max-height: 430px) {
    height: 100%;
  }
`;
const Button = styled.button`
  height: 2.5rem;
  width: 4rem;
  background-color: black;
  border-radius: 2rem;
  color: white;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
function EmptyPage({ message, onclick }) {
  return (
    <PageStyle>
      {message}
      <StyledDiv>
        <Button onClick={onclick}>Back</Button>
      </StyledDiv>
    </PageStyle>
  );
}

export default EmptyPage;
