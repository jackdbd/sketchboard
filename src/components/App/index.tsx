import React from "react";

import { Board } from "../Board";
import { Sidebar } from "../Sidebar";

import styles from "./styles.module.css";

export const App = () => {
  return (
    <div className={styles.app}>
      <Board text={"Board"} />
      <Sidebar text={"sidebar"} />
    </div>
  );
};
