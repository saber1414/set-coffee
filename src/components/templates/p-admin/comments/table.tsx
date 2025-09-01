"use client";

import React from "react";
import styles from "./table.module.css";
import { useContextApi } from "@/context/ContextApi";
import Swal from "sweetalert2";
import { FaStar, FaRegStar } from "react-icons/fa";

type TableProps = {
  title: string;
};

const Table = ({ title }: TableProps) => {
  const {
    comments,
    loading,
    error,
    refreshComments,
    fetchRejectComment,
    fetchAcceptComment,
    fetchAnswerComment,
    fetchDeleteComment
  } = useContextApi();

  const renderStars = (score: number) => {
    const maxStars = 5;
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        i <= score ? (
          <FaStar key={i} color="#f5c518" />
        ) : (
          <FaRegStar key={i} color="#ccc" />
        )
      );
    }

    return <div style={{ display: "flex", gap: "2px" }}>{stars}</div>;
  };

  // show comment body
  const showCommentBody = (body: string) => {
    Swal.fire({
      title: "متن دیدگاه",
      html: `
                <textarea style="width: 100%; height: 200px; padding: 10px; font-family: inherit; font-size: 14px; direction: rtl;" 
        readonly>${body}</textarea>
            `,
      confirmButtonText: "بستن",
    });
  };

  // reject comment
  const rejectCommentHandel = async (id: string) => {
    await fetchRejectComment(id);
    refreshComments();
  };

  // accept comment
  const acceptCommentHandel = async (id: string) => {
    await fetchAcceptComment(id);
    refreshComments();
  };

  // answer comment
  const answerCommentHandel = async(id: string ) => {
    await fetchAnswerComment(id,"مدیریت");
    refreshComments();
  };

  // delete comment
  const removeCommentHandel = async(id: string) => {
    await fetchDeleteComment(id);
    refreshComments();
  }

  return (
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
                <th>امتیاز</th>
                <th>محصول</th>
                <th>تایید</th>
                <th>رد</th>
                <th>مشاهده</th>
                <th>پاسخ</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
                <tr key={comment._id}>
                  <td>{index + 1}</td>
                  <td>{comment.name}</td>
                  <td>{renderStars(comment.score)}</td>
                  <td>{comment.product.title}</td>
                  <td>
                    {comment.isAccept ? (
                      "✅"
                    ) : (
                      <button
                        type="button"
                        onClick={() => acceptCommentHandel(comment._id)}
                        className={styles.edit_btn}
                      >
                        تایید
                      </button>
                    )}
                  </td>
                  <td>
                    {comment.isRejected ? (
                      "❌"
                    ) : (
                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => rejectCommentHandel(comment._id)}
                        className={styles.delete_btn}
                      >
                        {loading ? <div className="spinner"></div> : "رد"}
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => showCommentBody(comment.body)}
                      className={styles.edit_btn}
                    >
                      مشاهده
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => answerCommentHandel(comment._id)} className={styles.edit_btn}>
                      پاسخ
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => removeCommentHandel(comment._id)} className={styles.delete_btn}>
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
  );
};

export default Table;
