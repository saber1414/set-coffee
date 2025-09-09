import Layout from "@/components/layouts/adminPanel";
import AddProduct from "@/components/templates/p-admin/products/addProduct";
import Table from "@/components/templates/p-admin/products/table";
import React from "react";

const Page = () => {
  return (
    <>
      <Layout>
        <main>
          <AddProduct />
          <Table title="لیست محصولات" />
        </main>
      </Layout>
    </>
  );
};

export default Page;
