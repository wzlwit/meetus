import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
