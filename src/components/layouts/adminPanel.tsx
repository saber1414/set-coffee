import React from "react";
import styles from "./adminPanel.module.css";
import Sidebar from "../modules/p-user/sidebar/sidebar";
import TopBar from "../modules/p-user/topBar/topBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className={styles.layout}>
        <section className={styles.section}>
          <Sidebar />
          <div className={styles.contents}>
            <TopBar />
            {children}
          </div>
        </section>
      </div>
    </>
  );
};

export default Layout;
