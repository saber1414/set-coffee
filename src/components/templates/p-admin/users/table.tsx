"use client";

import React from "react";
import styles from "./table.module.css";
import { useContextApi } from "@/context/ContextApi";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";

type TableProps = {
  title: string;
};

const Table = ({ title }: TableProps) => {
  const { users, loading, error, removeUser } = useContextApi();

  const changeRoleHandel = async (id: string) => {
    Swal.fire({
      icon: "info",
      title: "تغییر نقش",
      text: "ایا می خواهید نق کاربر را تفییر دهید؟",
      cancelButtonText: "خیر",
      showCancelButton: true,
      confirmButtonText: "بله",
    }).then(async (res) => {
      if (res.isConfirmed) {
        Swal.fire({
          text: "نقش کاربر را وارد کنید",
          input: "text",
          cancelButtonText: "خیر",
          showCancelButton: true,
          confirmButtonText: "بله",
        }).then(async (res) => {
          if (res.isConfirmed) {
            try {
              const response = await axios.put(
                "/api/auth/users/role",
                { userId: id, newRole: res.value },
                { withCredentials: true }
              );

              if (response.status === 200) {
                location.reload();
              }
            } catch (err) {
              console.log("Error", err);
              toast.error("خطا در تغییر نقش");
              throw new Error("خطا در تغییر نقش کاربر");
            }
          }
        });
      }
    });
  };

  const removeUserHandler = async (id: string) => {
    await removeUser(id);
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
                  <th>نام و نام خانوادگی</th>
                  <th>ایمیل</th>
                  <th>شماره تلفن</th>
                  <th>نقش</th>
                  <th>تغییر سطح</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email ? user.email : "-"}</td>
                    <td>{user.phone}</td>
                    <td>
                      {(user.role === "ADMIN" && "مدیر") ||
                        (user.role === "USER" && "کاربر")}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => changeRoleHandel(user._id)}
                        className={styles.edit_btn}
                      >
                        تغییر نقش
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeUserHandler(user._id)}
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
