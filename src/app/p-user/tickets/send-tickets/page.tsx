"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/send-tickets.module.css";
import Layout from "@/components/layouts/userPanel";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import toast from "react-hot-toast";
import { Department } from "@/types/department";
import { SubDepartment } from "@/types/subDepartment";
import axios from "axios";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [subDepartment, setSubDepartment] = useState<SubDepartment[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedSubDepartment, setSelectedSubDepartment] =
    useState<string>("");
  const [priority, setPriority] = useState("2");
  const [form, setForm] = useState({
    title: "",
    body: "",
  });

  const sendTicketHandle = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const list = {
        ...form,
        priority: Number(priority),
        department: selectedDepartment,
        subDepartment: selectedSubDepartment,
      };
      const res = await axios.post("/api/tickets", list, {
        withCredentials: true,
      });

      if (res.status === 201) {
        setForm({ title: "", body: "" });
        toast.success("تیکت با موفقیت ثبت شد");
        setPriority("2");
        setSelectedDepartment("");
        setSelectedSubDepartment("");
      }
    } catch (err) {
      console.log("خطا در ارسال تیکت", err);
      toast.error("خطا در ارسال تیکت");
    } finally {
      setLoading(false);
    }
  };

  const departments = async () => {
    const res = await axios.get("/api/department");
    setDepartmentList(res.data.department);
  };

  const subDepartments = async () => {
    const res = await axios.get("/api/subDepartment");
    setSubDepartment(res.data.subDepartment);
  };

  useEffect(() => {
    departments();
    subDepartments();
  }, []);

  const filteredSubDepartments = subDepartment.filter(
    (sub) => sub.department === selectedDepartment
  );

  const changeInputHandel = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Layout>
        <main className={styles.container}>
          <h1 className={styles.title}>
            <span>ارسال تیکت جدید</span>
            <Link href="/p-user/tickets"> همه تیکت ها</Link>
          </h1>

          <div className={styles.content}>
            <div className={styles.group}>
              <label>دپارتمان را انتخاب کنید:</label>
              <select onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="-1">لطفا یک مورد را انتخاب نمایید.</option>
                {departmentList.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.title}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.group}>
              <label>نوع تیکت را انتخاب کنید:</label>
              <select
                onChange={(e) => setSelectedSubDepartment(e.target.value)}
              >
                <option value="-1">لطفا یک مورد را انتخاب نمایید.</option>
                {filteredSubDepartments.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.title}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.group}>
              <label>عنوان تیکت را وارد کنید:</label>
              <input
                name="title"
                value={form.title}
                onChange={changeInputHandel}
                placeholder="عنوان..."
                type="text"
              />
            </div>
            <div className={styles.group}>
              <label>سطح اولویت تیکت را انتخاب کنید:</label>
              <select onChange={(e) => setPriority(e.target.value)}>
                <option>لطفا یک مورد را انتخاب نمایید.</option>
                <option value="3">کم</option>
                <option value="2">متوسط</option>
                <option value="1">بالا</option>
              </select>
            </div>
          </div>
          <div className={styles.group}>
            <label>محتوای تیکت را وارد نمایید:</label>
            <textarea
              name="body"
              value={form.body}
              onChange={changeInputHandel}
              rows={10}
            ></textarea>
          </div>
          <div className={styles.uploader}>
            <span>حداکثر اندازه: 6 مگابایت</span>
            <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
            <input type="file" />
          </div>

          <button
            type="submit"
            onClick={sendTicketHandle}
            disabled={loading}
            className={styles.btn}
          >
            <IoIosSend />
            {loading ? <div className="spinner"></div> : "ارسال تیکت"}
          </button>
        </main>
      </Layout>
    </>
  );
};

export default Page;
