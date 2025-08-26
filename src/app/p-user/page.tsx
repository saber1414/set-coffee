import Layout from "@/components/layouts/userPanel";
import React from "react";
import styles from "@/styles/p-user.module.css";
import Orders from "@/components/templates/p-user/index/orders/orders";
import Box from "@/components/templates/p-user/index/box/box";
import Tickets from "@/components/templates/p-user/index/tickets/tickets";

const Index = () => {
  return (
    <>
      <Layout>
        <main>
          <section className={styles.boxes}>
            <Box title="مجموع تیکت ها " value="20" />
            <Box title="مجموع کامنت ها " value="0" />
            <Box title="مجموع سفارشات" value="2" />
            <Box title="مجموع علاقه مندی ها" value="10" />
          </section>
          <section className={styles.contents}>
            <Tickets />
            <Orders />
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Index;
