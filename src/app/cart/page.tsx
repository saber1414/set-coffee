import Navbar from "@/components/modules/navbar/Navbar";
import { authenticate } from "@/middleware/auth";
import { Metadata } from "next";
import React from "react";
import styles from "@/styles/cart.module.css";
import Table from "@/components/templates/cart/table";
import Footer from "@/components/modules/footer/Footer";
import Stepper from "@/components/modules/stepper/Stepper";

export const metadata: Metadata = {
  title: "سبد خرید | set-coffee",
};

const Page = async () => {
  const user = await authenticate();

  return (
    <>
      <head>
        <title>سبد خرید | set-coffee</title>
      </head>
      <Navbar isLogin={!!user} />
      <Stepper step="cart" />
      <main className={styles.cart}>
        <Table />
      </main>
      {/* <div class={styles.cart_empty} data-aos="fade-up">
                <TbShoppingCartX />
                <p>سبد خرید شما در حال حاضر خالی است. </p>
                <span>قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.</span>
                <span>در صفحه "فروشگاه"، محصولات جالب زیادی خواهید یافت.</span>
                <div>
                    <Link href='/category'>بازگشت به فروشگاه</Link>
                </div>
            </div> */}
    <Footer />
    </>
  );
};

export default Page;
