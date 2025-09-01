"use client";

import React from "react";
import styles from "./table.module.css";
import { useContextApi } from "@/context/ContextApi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";
import { removeTicket } from "@/utils/tickets";

type TableProps = {
  title: string;
};

const Table = ({ title }: TableProps) => {
  const { ticketsAdmin, loading, error } = useContextApi();

  const showTicketBody = (id: string, body: string) => {
    Swal.fire({
      title: `متن تیکت`,
      html: `
      <textarea 
        style="width: 100%; height: 200px; padding: 10px; font-family: inherit; font-size: 14px; direction: rtl;" 
        readonly
      >${body}</textarea>
    `,
      showConfirmButton: true,
      confirmButtonText: "بستن",
      customClass: {
        popup: "swal-wide",
      },
    });
  };

  // answer ticket
  const answerTicketHandel = async (id: string) => {
    Swal.fire({
      icon: "question",
      title: "ارسال پاسخ",
      input: "textarea",
      showCancelButton: true,
      cancelButtonText: "لغو",
      confirmButtonText: "ارسال",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const response = await axios.post("/api/tickets/answer", {
          ticketId: id,
          adminAnswer: res.value,
        });
        if (response.status === 201) {
          location.reload();
          toast.success("پاسخ ارسال شد");
        }
      }
    });
  };

  // remove ticket
  const removeTicketHandel = async (id: string) => {
    Swal.fire({
      icon: "warning",
      title: "حذف تیکت",
      text: "آیا میخواهید تیکت را حذف کنید؟",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await removeTicket(id);
        toast.success("تیتک با موفقیت حذف شد");
        location.reload();
      }
    });
  };

  return (
    <>
      <div>
        <div>
          <h1 className={styles.title}>
            <span>{title}</span>
          </h1>
        </div>
        <div className={styles.table_container}>
          {loading ? (
            <p>صبر کنید</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>شناسه</th>
                  <th>کاربر</th>
                  <th>عنوان</th>
                  <th>دپارتمان</th>
                  <th>وضعیت</th>
                  <th>مشاهده</th>
                  <th>پاسخ</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {ticketsAdmin.map((ticket, index) => (
                  <tr key={ticket._id}>
                    <td>{index + 1}</td>
                    <td>{ticket.user?.name}</td>
                    <td>{ticket.title}</td>
                    <td>{ticket.department.title}</td>
                    <td>{ticket.status}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => showTicketBody(ticket._id, ticket.body)}
                        className={styles.edit_btn}
                      >
                        مشاهده
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => answerTicketHandel(ticket._id)}
                        className={styles.edit_btn}
                      >
                        پاسخ
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeTicketHandel(ticket._id)}
                        className={styles.delete_btn}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
