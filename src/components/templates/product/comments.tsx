import React from "react";
import styles from "./comments.module.css";
import CommentForm from "./commentForm";
import Comment from "@/components/modules/comment/Comment";

const Comments = () => {
  return (
    <>
      <p>نظرات (7) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            7 دیدگاه برای کپسول قهوه SETPRESSO سازگار با دستگاه نسپرسو ( GOLD )
            ده -10- عددی
          </p>
          <div>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm />
        </div>
      </main>
    </>
  );
};

export default Comments;
