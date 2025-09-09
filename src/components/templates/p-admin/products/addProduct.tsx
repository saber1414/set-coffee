"use client";

import React, { ChangeEvent, useState } from "react";
import styles from "./table.module.css";
import toast from "react-hot-toast";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    tags: "",
    slug: "",
    price: 0,
    shortDescription: "",
    description: "",
    stock: 0,
    rating: 0,
    images: [] as File[],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const inputChangeHandel = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericFields = ["price", "stock", "rating"];
    const newValue = numericFields.includes(name) ? Number(value) : value;

    setForm({ ...form, [name]: newValue });
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setForm({ ...form, images: filesArray });
    }
  };

  const newProductHandel = async () => {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("tags", JSON.stringify(form.tags.split("،").map(tag => tag.trim())));
    formData.append("slug", form.slug);
    formData.append("price", String(form.price));
    formData.append("shortDescription", form.shortDescription);
    formData.append("description", form.description);
    formData.append("stock", String(form.stock));
    formData.append("rating", String(form.rating));

    form.images.forEach((file) => {
      formData.append("images", file);
    });
    try {
      setLoading(true);
      const res = await axios.post("/api/product", formData, {
        withCredentials: true,
      });
      if (res.status === 201) {
        toast.success("محصول با موفقیت ایجاد شد");
        setForm({
          title: "",
          category: "",
          tags: "",
          slug: "",
          price: 0,
          shortDescription: "",
          description: "",
          stock: 0,
          rating: 0,
          images: [],
        });
      }
    } catch (err) {
      console.log("err", err);
      toast.error("خطا در ایجاد محصول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.discount}>
      <p>افزودن محصول جدید</p>
      <div className={styles.discount_main}>
        <div>
          <label>نام محصول</label>
          <input
            name="title"
            value={form.title}
            onChange={inputChangeHandel}
            placeholder="لطفا نام محصول را وارد کنید"
            type="text"
          />
        </div>
        <div>
          <label>مبلغ محصول</label>
          <input
            name="price"
            value={form.price}
            onChange={inputChangeHandel}
            placeholder="لطفا مبلغ محصول را وارد کنید"
            type="number"
          />
        </div>
        <div>
          <label>توضیحات کوتاه</label>
          <input
            name="shortDescription"
            value={form.shortDescription}
            onChange={inputChangeHandel}
            placeholder="توضیحات کوتاه محصول"
            type="text"
          />
        </div>
        <div>
          <label>توضیحات</label>
          <input
            name="description"
            value={form.description}
            onChange={inputChangeHandel}
            placeholder="توضیحات بلند محصول"
            type="text"
          />
        </div>
        <div>
          <label>دسته بندی</label>
          <input
            name="category"
            value={form.category}
            onChange={inputChangeHandel}
            placeholder="دسته بندی"
            type="text"
          />
        </div>
        <div>
          <label>امتیاز</label>
          <input
            name="rating"
            value={form.rating}
            onChange={inputChangeHandel}
            placeholder="وزن امتیاز"
            type="number"
          />
        </div>
        <div>
          <label>تعداد محصول</label>
          <input
            name="stock"
            value={form.stock}
            onChange={inputChangeHandel}
            placeholder="تعداد محصول"
            type="number"
          />
        </div>
        <div>
          <label>تگ های محصول</label>
          <input
            name="tags"
            value={form.tags}
            onChange={inputChangeHandel}
            placeholder="مثال: قهوه،قهوه ترک، قهوه اسپرسو"
            type="text"
          />
        </div>
        <div>
          <label>شناسه محصول</label>
          <input
            name="slug"
            value={form.slug}
            onChange={inputChangeHandel}
            placeholder="شناسه محصول"
            type="text"
          />
        </div>
        <div>
          <label>تصویر محصول</label>
          <input
            name="images"
            onChange={fileChangeHandler}
            type="file"
            multiple
            accept="image/*"
          />
        </div>
      </div>
      <button type="button" disabled={loading} onClick={newProductHandel}>
        {loading ? <div className="spinner"></div> : "افزودن"}
      </button>
    </section>
  );
};

export default AddProduct;
