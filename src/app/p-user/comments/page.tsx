import Layout from "@/components/layouts/userPanel";
import DataTable from "@/components/templates/p-user/comments/datatable";
import React from "react";
import styles from "@/styles/comments.module.css"
import connectDB from "@/lib/db";
import { Comment } from "@/models/index"


const Page = async() => {

  return (
    <>
      <Layout>
        {/* <DataTable title="لیست دیدگاه ها" comments="d" /> */}
        <p className={styles.empty}>
          کامنتی وجود ندارد
        </p> 
      </Layout>
    </>
  );
};

export default Page;
