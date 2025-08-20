import React from "react";
import styles from "./breadcrumb.module.css";
import Link from "next/link";

type BreadcrumbProps = {
  route: string;
};

const Breadcrumb = ({ route }: BreadcrumbProps) => {
  return (
    <>
      <div className={styles.breadcrumb}>
        <p className={styles.title}>{route}</p>
        <div>
          <Link href={"/"}>خانه</Link>
          <span>/</span>
          <p>{route}</p>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
