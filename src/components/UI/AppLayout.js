import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import { useDispatch } from "react-redux";

function AppLayout() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main style={{ paddingTop: "7rem" }}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AppLayout;
