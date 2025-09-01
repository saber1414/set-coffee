import Layout from "@/components/layouts/adminPanel";
import Table from "@/components/templates/p-admin/tickets/table";
import React from "react";

const Page = () => {
  return (
    <>
      <Layout>
        <main>
          <Table title="لیست تیکت های ثبت شده" />
        </main>
      </Layout>
    </>
  );
};

export default Page;
