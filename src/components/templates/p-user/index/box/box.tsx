import React from "react";
import styles from "./box.module.css";
import { IoStatsChart } from "react-icons/io5";

type BoxProps = {
  title: string;
  value: string;
};

const Box = ({ title, value }: BoxProps) => {
  return (
    <>
      <div className={styles.box}>
        <span>{value}</span>
        <div>
          <p>{title}</p>
          <IoStatsChart className={styles.box_chart_icon} />
        </div>
      </div>
    </>
  );
};

export default Box;
