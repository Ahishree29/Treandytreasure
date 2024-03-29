import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const AppWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;

const Main = styled.main`
  background-color: #3d103c;

  overflow-y: auto;

  @media (max-width: 750px) {
    padding-bottom: 5rem;
  }
`;
function AppLayout() {
  return (
    <AppWrapper>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </AppWrapper>
  );
}

export default AppLayout;
