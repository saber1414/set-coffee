import Layout from "@/components/layouts/userPanel";
import AccountDetails from "@/components/templates/p-user/account-details/account-details";
import React from "react";

const Page = async () => {
  return (
    <>
      <Layout>
        <AccountDetails />
      </Layout>
    </>
  );
};

export default Page;
