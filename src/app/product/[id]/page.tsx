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
import { Product } from "@/models";
import { ProductDetails } from "@/types/product";

export async function generateMetadata({ params }: { params: { id: string } }) {
  await connectDB();
  const product = await Product.findById(params.id).lean<ProductDetails>();

  if (!product) return { title: "محصول یافت نشد" };

  return {
    title: `${product.title} | set-coffee`
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  await connectDB();
  const user = await authenticate();

  const productId = params.id;

  const rawProduct = await Product.findById(productId)
    .populate({
      path: "comments",
      select: "-product",
    })
    .lean();

  const product = JSON.parse(JSON.stringify(rawProduct)); 

  return (
    <div className={styles.container}>
      <Navbar isLogin={!!user} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={product} />
          <Gallery images={product.images} />
        </div>
        <Tabs product={product} />
        <MoreProducts />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
