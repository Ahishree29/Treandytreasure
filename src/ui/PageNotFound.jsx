import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledPageNotFond = styled.div`
  height: 100vh;
  background-color: #3d103c;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 30rem;
  font-size: 30px;
`;
const Button = styled.button`
  height: 30px;
  display: flex;
  justify-content: center;
`;
function PageNotFound() {
  const navigate = useNavigate();
  return (
    <StyledPageNotFond>
      Page Not found 😥
      <Button onClick={() => navigate(-1)}> &larr; Back</Button>
    </StyledPageNotFond>
  );
}

export default PageNotFound;
