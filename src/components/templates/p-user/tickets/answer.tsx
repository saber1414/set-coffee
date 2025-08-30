import React, { useEffect, useState } from "react";
import styles from "./answer.module.css";
import Image from "next/image";
import { Tickets } from "@/types/tickets";
import axios from "axios";
import { User } from "@/types/user";

type AnswerProps = {
  type: string;
  ticket: Tickets;
};

const Answer = ({ type, ticket }: AnswerProps) => {
const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/auth/me");
      setUser(res.data);
    };

    fetchUser();
  }, []);

  return (
    <>
      <section
        className={type == "user" ? styles.userTicket : styles.adminticket}
      >
        <div className={styles.ticket_main}>
          <p>{new Date(ticket.createdAt).toLocaleDateString("fa-IR")} </p>
          <div>
            <div>
              <p>{user?.name}</p>
              <span>{user?.role === "USER" && "کاربر"}</span>
            </div>
            <Image width={80} height={80} src="/images/shahin.jpg" alt="" />
          </div>
        </div>
        <div className={styles.ticket_text}>
          <p>{ticket.body}</p>
        </div>
      </section>
    </>
  );
};

export default Answer;
