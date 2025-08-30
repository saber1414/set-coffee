import React from "react";
import styles from "./answer.module.css";
import Image from "next/image";
import { Tickets } from "@/types/tickets";

type AdminAnswerProps = {
  type: string;
  ticket: Tickets;
};

const AdminAnswer = ({ type, ticket }: AdminAnswerProps) => {
  return (
    <>
      <section
        className={type == "user" ? styles.userTicket : styles.adminticket}
      >
        <div className={styles.ticket_main}>
          <p>
            {ticket.answeredAt
              ? new Date(ticket.answeredAt).toLocaleDateString("fa-IR")
              : ""}
          </p>
          <div>
            <div>
              <p>{ticket.answeredBy?.name}</p>
              <span>{ticket.answeredBy?.role === "ADMIN" && "مدیریت"}</span>
            </div>
            <Image width={80} height={80} src="/images/shahin.jpg" alt="" />
          </div>
        </div>
        <div className={styles.ticket_text}>
          <p>{ticket.adminAnswer}</p>
        </div>
      </section>
    </>
  );
};

export default AdminAnswer;
