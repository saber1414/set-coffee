import React from "react";
import styles from "@/styles/product.module.css";
import Navbar from "@/components/modules/navbar/Navbar";
import { authenticate } from "@/middleware/auth";
import Gallery from "@/components/templates/product/gallery";
import Details from "@/components/templates/product/details";
import Footer from "@/components/modules/footer/Footer";
import Tabs from "@/components/templates/product/tabs";
import MoreProducts from "@/components/templates/product/moreProducts";
import connectDB from "@/lib/db";
import { Product, Comment } from "@/models";



const Page = async ({ params }: { params: { id: string } }) => {
  await connectDB();
  const user = await authenticate();

  const productId = params.id;

  const product = await Product.findById(productId).populate("comments");

  return (
    <>
      <div className={styles.container}>
        <Navbar isLogin={!!user} />
        <div data-aos="fade-up" className={styles.contents}>
          <div className={styles.main}>
            <Details product={product} />
            <Gallery />
          </div>
          <Tabs comments={JSON.parse(JSON.stringify(product.comments))}  />
          <MoreProducts />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
