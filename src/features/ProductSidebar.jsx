import styled from "styled-components";
import SidebarContents from "../ui/SidebarContents";

const Sidebar = styled.div`
  background-color: #181618;
  width: 20rem;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  @media (max-width: 1200px) {
    width: 15rem;
  }
  @media (max-width: 750px) {
    width: 10rem;
    height: 100%;
  }
  @media (max-width: 600px) {
    width: 8rem;
    height: 100%;
  }
  @media (max-width: 365px) {
    width: 6rem;
  }
`;

function ProductSidebar({ selectedGender, types }) {
  return (
    <Sidebar>
      <SidebarContents selectedGender={selectedGender} Types={types} />
    </Sidebar>
  );
}

export default ProductSidebar;
