"use client";

import React from "react";
import styles from "@/styles/answer-ticket.module.css";
import Layout from "@/components/layouts/userPanel";
import Link from "next/link";
import Answer from "@/components/templates/p-user/tickets/answer";
import { useContextApi } from "@/context/ContextApi";
import AdminAnswer from "@/components/templates/p-user/tickets/adminAnswer";
import { useParams } from "next/navigation";

const Page = () => {
  const { tickets } = useContextApi();
  const { id } = useParams();

  const ticket = tickets.find((t) => t._id === id);

  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>تیکت</span>
          <Link href="/p-user/tickets/send-tickets">ارسال تیکت جدید</Link>
        </h1>

        <div>
          {ticket ? (
            <div>
              <Answer type="user" ticket={ticket} />
              {ticket.isAnswer && <AdminAnswer type="admin" ticket={ticket} />}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>تیکتی با این شناسه پیدا نشد</p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Page;
