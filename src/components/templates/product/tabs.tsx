"use client";

import React, { useState } from "react";
import styles from "./tabs.module.css";
import Description from "./description";
import MoreInfos from "./moreInfos";
import Comments from "./comments";

const Tabs = () => {
  const [tab, setTab] = useState("description");
  return (
    <>
      <div data-aos="fade-left" className={styles.tabs}>
        <input
          onClick={() => setTab("description")}
          type="radio"
          id="description"
          name="tab-control"
          checked={tab === "description"}
        />
        <input
          onClick={() => setTab("moreInfos")}
          type="radio"
          id="moreInfoes"
          name="tab-control"
          checked={tab === "moreInfos"}
        />
        <input
          onClick={() => setTab("comments")}
          type="radio"
          id="comments"
          name="tab-control"
          checked={tab === "comments"}
        />
        <ul>
          <li title="Features">
            <label htmlFor="description" role="button">
              {" "}
              توضیحات{" "}
            </label>
          </li>
          <li title="Delivery Contents">
            <label htmlFor="moreInfoes" role="button">
              {" "}
              اطلاعات بیشتر{" "}
            </label>
          </li>
          <li title="Shipping">
            <label htmlFor="comments" role="button">
              {" "}
              نظرات (7){" "}
            </label>
          </li>
        </ul>

        <div className={styles.contents}>
          <section className={styles.tabs_content}>
            <Description />
          </section>
          <section className={styles.tabs_content}>
            <MoreInfos />
          </section>
          <section className={styles.tabs_content}>
            <Comments />
          </section>
        </div>
      </div>
    </>
  );
};

export default Tabs;
