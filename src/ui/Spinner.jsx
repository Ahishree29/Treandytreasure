import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
const StyledDiv = styled.div`
  height: 100dvh;
  display: flex;
  justify-content: center;
  padding-top: 25rem;
`;
function Spinner() {
  return (
    <StyledDiv>
      <ClipLoader
        color="#de6d21"
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </StyledDiv>
  );
}

export default Spinner;
