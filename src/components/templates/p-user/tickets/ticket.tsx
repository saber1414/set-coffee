import Link from "next/link";
import React from "react";
import styles from "./ticket.module.css";
import { Tickets } from "@/types/tickets";

const Ticket = ({ title, department, createdAt, status, _id }: Tickets) => {
  return (
    <Link href={`/p-user/tickets/answer/${_id}`} className={styles.ticket}>
      <div>
        <p>{title}</p>
        <p className={styles.department}>{department.title}</p>
      </div>
      <div>
        <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
        <p className={styles.no_answer}>{status === "OPEN" && "باز"}</p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
