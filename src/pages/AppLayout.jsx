import React from "react";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

import styles from "./AppLayout.module.css";
import { useAuthentication } from "../contexts/AuthenticationContext";
import User from "../components/User";
import Homepage from "./HomePage";

export default function AppLayout() {
  const { isAuthenticated, user } = useAuthentication();

  if (!isAuthenticated || !user) return <Homepage />;

  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  );
}
