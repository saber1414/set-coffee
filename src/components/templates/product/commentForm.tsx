import React, { useState } from "react";
import styles from "./commentForm.module.css";
import { IoMdStar } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";
import { ProductComments } from "@/types/product";
import { useParams } from "next/navigation";

const CommentForm = () => {
  const { id: productId } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    body: "",
    score: 5,
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);


  const changeInputHandel = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelScore = (score: number) => {
    setForm({ ...form, score });
  };

  //

  const submitFormHandle = async () => {
    try {
      setLoading(true);
      const newError = {
        name: form.name.trim() ? "" : "نام کاربری الزامی است",
        email: form.email ? "" : "ایمیل الزامی است",
        body: form.body.trim() ? "" : "متن دیدگاه الزامی است",
      };

      setError(newError);

      const hasError = Object.values(newError).some((msg) => msg !== "");

      if (hasError) {
        toast.error("لطفا فرم را برسی کنید");
        return;
      };

      const res = await axios.post<ProductComments>("/api/comments", {
        ...form,
        product: productId
      });

      if (res.status === 201) {
        toast.success("دیدگاه با موفقیت ثبت شد");
        setForm({ name: "", email: "", body: "", score: 5 });
      }

    } catch (err) {
      console.log("خطا در ارسال دیدگاه", err);
      toast.error("خطا در ارسال دیدگاه");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.form}>
        <p className={styles.title}>دیدگاه خود را بنویسید</p>
        <p>
          نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
          <span style={{ color: "red" }}>*</span>
        </p>
        <div className={styles.rate}>
          <p>امتیاز شما :</p>
          <div>
            {[5, 4, 3, 2, 1].map((star) => (
              <IoMdStar
                key={star}
                onClick={() => handelScore(star)}
                className={
                  form.score >= star ? styles.activeStar : styles.inactiveStar
                }
              />
            ))}
          </div>
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            دیدگاه شما
            <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            id="comment"
            name="body"
            value={form.body}
            onChange={changeInputHandel}
            cols={45}
            rows={8}
            required
            placeholder="دیدگاه خود را اینجا بنویسید"
          />
          {error.body && <p className={styles.error}>{error.body}</p>}
        </div>
        <div className={styles.groups}>
          <div className={styles.group}>
            <label htmlFor="">
              نام
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={changeInputHandel}
              type="text"
            />
            {error.name && <p className={styles.error}>{error.name}</p>}
          </div>
          <div className={styles.group}>
            <label htmlFor="">
              ایمیل
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="email"
              value={form.email}
              onChange={changeInputHandel}
              type="email"
            />
            {error.email && <p className={styles.error}>{error.email}</p>}
          </div>
        </div>
        <div className={styles.checkbox}>
          <input type="checkbox" onChange={() => setIsChecked(true)} name="body" id="" />
          <p>
            {" "}
            ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
            می‌نویسم.
          </p>
        </div>
        <button type="button" disabled={loading} onClick={submitFormHandle}>
          {loading ? <div className="spinner"></div> : "ثبت"}
        </button>
      </div>
    </>
  );
};

export default CommentForm;
