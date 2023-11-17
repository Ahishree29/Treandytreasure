import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

function SidebarContent({ type }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isClicked, setClicked] = useState(false);
  function handleSelect(value) {
    setClicked(true);
    searchParams.set("type", value);
    setSearchParams(searchParams);
  }

  const StyledContent = styled.li`
    color: ${isClicked ? "blue" : "white"};

    margin-left: 50px;
    font-size: 2;
    gap: 10px;
    padding-bottom: 20px;
    @media (max-width: 600px) {
      margin-left: 10px;
    }
    @media (max-width: 365px) {
      margin-left: 0.5px;
    }
  `;

  return (
    <StyledContent onClick={() => handleSelect(type)}>{type}</StyledContent>
  );
}

export default SidebarContent;
