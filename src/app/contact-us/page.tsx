import React from "react";
import styles from "@/styles/contact-us.module.css";
import Navbar from "@/components/modules/navbar/Navbar";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import { authenticate } from "@/middleware/auth";
import Form from "@/components/templates/contact-us/form/Form";
import Information from "@/components/templates/contact-us/information/Information";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تماس با ما | set-coffee",
};

const Page = async () => {
  const user = await authenticate();

  return (
    <>
      <head>
        <title>تماس با ما | set-coffee</title>
      </head>
      <Navbar isLogin={!!user} />
      <Breadcrumb route={"تماس با ما"} />
      <div className={styles.container}>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
