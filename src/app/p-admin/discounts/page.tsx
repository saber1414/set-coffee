import Layout from "@/components/layouts/adminPanel";
import Table from "@/components/templates/p-admin/discounts/table";
import React from "react";

const Page = () => {
  return (
    <>
      <Layout>
        <main>
            <Table title="لیست تخفیفات" />
        </main>
      </Layout>
    </>
  );
};

export default Page;
