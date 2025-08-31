import Layout from "@/components/layouts/adminPanel";
import Table from "@/components/templates/p-admin/users/table";
import React from "react";
import styles from "@/components/templates/p-admin/users/table.module.css"

const Page = () => {
  return (
    <>
      <Layout>
        <main>
          {/* <p className={styles.empty}>کاربری وجود ندارد</p> */}

          <Table title="لیست کاربران" />
        </main>
      </Layout>
    </>
  );
};

export default Page;
