import React from "react";
import styles from "./comments.module.css";
import CommentForm from "./commentForm";
import Comment from "@/components/modules/comment/Comment";
import { ProductComments } from "@/types/product";

type CommentsProps = {
  comments: ProductComments[]
}

const Comments = ({ comments }: CommentsProps) => {

  return (
    <>
      <p>نظرات ({comments.length}) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            {comments.length} - دیدگاه
          </p>
          <div>
            {
              comments.map((comment) => (
                <Comment key={comment._id} {...comment} />
              ))
            }
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
