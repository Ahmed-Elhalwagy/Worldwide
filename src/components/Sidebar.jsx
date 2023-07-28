import React from "react";
import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "../components/AppNav";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />
    </div>
  );
}

export default Sidebar;
