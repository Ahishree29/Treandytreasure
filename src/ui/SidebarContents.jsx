import styled from "styled-components";
import SidebarContent from "./SidebarContent";
import { useSearchParams } from "react-router-dom";
const StyledContents = styled.ul`
  color: white;
  margin-left: 60px;
  @media (max-width: 750px) {
    margin-left: 5px;
  }
  @media (max-width: 600px) {
    width: 20px;
    margin-left: 0.2rem;
  }
  @media (max-width: 365px) {
    width: 20px;
    margin-left: 0.1rem;
  }
`;
const StyledViewAll = styled.li`
  margin-left: 50px;
  padding-bottom: 20px;
  padding-top: 15px;
  @media (max-width: 600px) {
    width: 20px;
    margin-left: 13px;
  }
  @media (max-width: 365px) {
    width: 20px;
    margin-left: 1px;
  }
`;
function SidebarContents({ selectedGender, Types }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSelect() {
    setSearchParams((params) => {
      params.delete("type");
      return params;
    });
  }
  return (
    <StyledContents>
      <StyledViewAll onClick={handleSelect}>view All</StyledViewAll>
      {Types.map((type) => (
        <SidebarContent type={type} key={type} />
      ))}
    </StyledContents>
  );
}

export default SidebarContents;
