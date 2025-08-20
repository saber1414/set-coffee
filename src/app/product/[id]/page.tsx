import React from "react";
import styles from "@/styles/product.module.css";
import Navbar from "@/components/modules/navbar/Navbar";
import { authenticate } from "@/middleware/auth";
import Gallery from "@/components/templates/product/gallery";
import Details from "@/components/templates/product/details";
import Footer from "@/components/modules/footer/Footer";
import Tabs from "@/components/templates/product/tabs";
import MoreProducts from "@/components/templates/product/moreProducts";

const Page = async () => {
  const user = await authenticate();

  return (
    <>
      <div className={styles.container}>
        <Navbar isLogin={!!user} />
        <div data-aos="fade-up" className={styles.contents}>
          <div className={styles.main}>
            <Details />
            <Gallery />
          </div>
          <Tabs />
          <MoreProducts />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
