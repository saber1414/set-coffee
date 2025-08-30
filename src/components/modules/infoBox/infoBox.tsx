import React from "react";
import styles from "./infoBox.module.css";
import { IoStatsChart } from "react-icons/io5";

type InfoBoxProps = {
  title: string;
  value: string;
};

const InfoBox = ({ title, value }: InfoBoxProps) => {
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

export default InfoBox;
