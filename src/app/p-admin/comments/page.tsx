import Layout from "@/components/layouts/adminPanel";
import Table from "@/components/templates/p-admin/comments/table";
import React from "react";

const Page = () => {
  return (
    <>
      <Layout>
        <main>
            <Table title="لیست دیدگاه ها" />
        </main>
      </Layout>
    </>
  );
};

export default Page;
