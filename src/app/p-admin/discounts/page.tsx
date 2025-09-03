import Layout from "@/components/layouts/adminPanel";
import DiscountForm from "@/components/templates/p-admin/discounts/discountForm";
import Table from "@/components/templates/p-admin/discounts/table";
import React from "react";

const Page = () => {
  return (
    <>
      <Layout>
        <main>
            <DiscountForm />
            <Table title="لیست تخفیفات" />
        </main>
      </Layout>
    </>
  );
};

export default Page;
