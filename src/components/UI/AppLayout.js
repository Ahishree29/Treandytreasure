import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


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
