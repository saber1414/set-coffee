"use client";

import { Comments } from "@/types/comments";
import { Discounts } from "@/types/discounts";
import { ProductDetails } from "@/types/product";
import { Tickets } from "@/types/tickets";
import { User } from "@/types/user";
import {
  getFetchAcceptComment,
  getFetchAnswerComment,
  getFetchComments,
  getFetchDeleteComment,
  getFetchRejectComment,
} from "@/utils/comments";
import { getFetchDiscounts } from "@/utils/discounts";
import { getFetchProducts } from "@/utils/products";
import { getFetchTickets } from "@/utils/tickets";
import { getFetchUserDelete } from "@/utils/users";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export interface ContextApiProps {
  wishlist: ProductDetails[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  tickets: Tickets[];
  users: User[];
  ticketsAdmin: Tickets[];
  comments: Comments[];
  discounts: Discounts[];
  products: ProductDetails[];
  fetchTickets: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  removeUser: (id: string) => Promise<void>;
  allTickets: () => Promise<void>;
  allComments: () => Promise<void>;
  fetchRejectComment: (id: string) => Promise<void>;
  fetchAcceptComment: (id: string) => Promise<void>;
  fetchAnswerComment: (id: string, author: string) => Promise<void>;
  fetchDeleteComment: (id: string) => Promise<void>;
  refreshComments: () => Promise<void>;
  refreshDiscounts: () => Promise<void>;
  fetchDiscounts: () => Promise<void>;
  allProducts: () => Promise<void>;
}

const ContextApi = createContext<ContextApiProps | null>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<ProductDetails[]>([]);
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [ticketsAdmin, setTicketsAdmin] = useState<Tickets[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);
  const [discounts, setDiscounts] = useState<Discounts[]>([]);
  const [products, setProducts] = useState<ProductDetails[]>([]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/wishlist", {
        withCredentials: true,
      });
      setWishlist(response.data.wishes);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "خطا در دریافت لیست علاقه‌مندی‌ها";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/tickets/user", {
        withCredentials: true,
      });
      setTickets(res.data.tickets);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "خطا در دریافت تیکت‌ها";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/auth/users", { withCredentials: true });
      setUsers(res.data?.users);
    } catch (err) {
      toast.error("خطا در دریافت کاربران");
    }
  };

  const removeUser = async (id: string) => {
    try {
      const res = await Swal.fire({
        icon: "warning",
        title: "حذف کاربر",
        text: "آیا می‌خواهید کاربر را حذف کنید؟",
        showCancelButton: true,
        cancelButtonText: "خیر",
        confirmButtonText: "بله",
      });

      if (res.isConfirmed) {
        await getFetchUserDelete(id);
        setUsers((prev) => prev.filter((user) => user._id !== id));
        toast.success("کاربر حذف شد");
      }
    } catch (err) {
      console.error("خطا در حذف کاربر", err);
      toast.error("خطا در حذف کاربر");
    }
  };

  const allTickets = async () => {
    const data = await getFetchTickets();
    setTicketsAdmin(data);
  };

  const allComments = async () => {
    const data = await getFetchComments();
    setComments(data);
  };

  const refreshComments = async () => {
    const data = await getFetchComments();
    setComments(data);
  };

  const fetchRejectComment = async (id: string): Promise<void> => {
    const res = await Swal.fire({
      icon: "warning",
      title: "رد دیدگاه",
      text: "آیا می‌خواهید این دیدگاه را رد کنید؟",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    });

    if (res.isConfirmed) {
      await getFetchRejectComment(id);
      toast.success("دیدگاه رد شد");
    }
  };

  const fetchAcceptComment = async (id: string): Promise<void> => {
    const res = await Swal.fire({
      icon: "info",
      title: "تایید دیدگاه",
      text: "آیا می‌خواهید دیدگاه را تایید کنید؟",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    });

    if (res.isConfirmed) {
      await getFetchAcceptComment(id);
      toast.success("دیدگاه تایید شد");
    }
  };

  const fetchAnswerComment = async (
    id: string,
    author: string
  ): Promise<void> => {
    const res = await Swal.fire({
      icon: "info",
      title: "پاسخ",
      input: "textarea",
      inputPlaceholder: "پاسخ خود را وارد کنید...",
      showCancelButton: true,
      cancelButtonText: "لغو",
      confirmButtonText: "ارسال",
      inputAttributes: {
        dir: "rtl",
        style: "font-family: inherit; font-size: 14px; padding: 10px;",
      },
    });

    if (res.isConfirmed && res.value.trim()) {
      await getFetchAnswerComment(id, res.value, author);
      toast.success("پاسخ با موفقیت ارسال شد");
      await refreshComments();
    } else if (res.isConfirmed && !res.value.trim()) {
      toast.error("متن پاسخ نمی‌تواند خالی باشد");
    }
  };

  const fetchDeleteComment = async (id: string): Promise<void> => {
    const res = await Swal.fire({
      icon: "warning",
      title: "حذف دیدگاه",
      text: "آیا میخواهید این دیدگاه را حذف کنید؟",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    });

    if (res.isConfirmed) {
      await getFetchDeleteComment(id);
      setComments((prev) => prev.filter((comment) => comment._id !== id));
      toast.success("دیدگاه حذف شد");
    }
  };

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const data = await getFetchDiscounts();
      setDiscounts(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "خطا در دریافت کدهای تخفیف";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const allProducts = async () => {
    const data = await getFetchProducts();
    setProducts(data);
  };

  const refreshDiscounts = async() => {
    const discountData = await getFetchDiscounts();
    setDiscounts(discountData)
  };


  useEffect(() => {
    fetchWishlist();
    fetchTickets();
    fetchUsers();
    allTickets();
    allComments();
    fetchDiscounts();
    allProducts();
  }, []);

  return (
    <ContextApi.Provider
      value={{
        wishlist,
        loading,
        setLoading,
        error,
        tickets,
        fetchTickets,
        users,
        fetchUsers,
        removeUser,
        allTickets,
        ticketsAdmin,
        comments,
        allComments,
        fetchRejectComment,
        fetchAcceptComment,
        fetchAnswerComment,
        fetchDeleteComment,
        refreshComments,
        discounts,
        fetchDiscounts,
        products,
        refreshDiscounts,
        allProducts,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export const useContextApi = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("useContextApi must be used within a ContextProvider");
  }
  return context;
};
