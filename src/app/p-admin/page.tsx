import Layout from "@/components/layouts/adminPanel";
import React from "react";
import styles from "@/styles/p-admin/p-admin.module.css";
import Box from "@/components/modules/infoBox/infoBox";
import { authenticate } from "@/middleware/auth";
import { redirect } from "next/navigation";
import SealChart from "@/components/templates/p-admin/index/sealChart";
import GrowthChart from "@/components/templates/p-admin/index/growthChart";

const Page = async () => {
  const user = await authenticate();

  if (!user || user.role !== "ADMIN") redirect("/");

  return (
    <>
      <Layout>
        <main>
          <section className={styles.dashboard_contents}>
            <Box title="مجموع تیکت های دریافتی" value="0" />
            <Box title="مجموع محصولات سایت" value="0" />
            <Box title="مجموع سفارشات" value="333" />
            <Box title="مجموع کاربر های سایت" value="0" />
          </section>{" "}
          <div className={styles.dashboard_charts}>
            <section>
              <p>آمار فروش</p>
              <SealChart />
            </section>
            <section>
              <p>نرخ رشد</p>
              <GrowthChart />
            </section>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Page;
