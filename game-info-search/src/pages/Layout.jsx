import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Container from "@mui/material/Container";

function Layout() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Outlet />
      </Container>

      <footer></footer>
    </>
  );
}

export default Layout;
