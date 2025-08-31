"use client";

import { ProductDetails } from "@/types/product";
import { Tickets } from "@/types/tickets";
import { User } from "@/types/user";
import { getFetchUserDelete } from "@/utils/users";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export interface ContextApiProps {
  wishlist: ProductDetails[];
  loading: boolean;
  error: string | null;
  tickets: Tickets[];
  users: User[];
  fetchTickets: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  removeUser: (id: string) => Promise<void>;
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

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/wishlist", {
        withCredentials: true,
      });
      setWishlist(response.data.wishes);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error wishlist fetching";
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
        err instanceof Error ? err.message : "Error wishlist fetching";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const res = await axios.get("/api/auth/users", { withCredentials: true });
    setUsers(res.data?.users);
  };

  const removeUser = async (id: string) => {
    try {
      Swal.fire({
        icon: "warning",
        title: "حذف کاربر",
        text: "آیا میخواهید کاربر را حذف کنید",
        showCancelButton: true,
        cancelButtonText: "خیر",
        confirmButtonText: "بله",
      }).then(async (res) => {
        if (res.isConfirmed) {
          await getFetchUserDelete(id);
          setUsers((prev) => prev.filter((user) => user._id !== id));
          toast.success("کاربر حذف شد")
        }
      });
    } catch (err) {
      console.error("خطا در حذف کاربر", err);
      toast.error("خطا در حذف کاربر");
    }
  };

  useEffect(() => {
    fetchWishlist();
    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <ContextApi.Provider
      value={{
        wishlist,
        loading,
        error,
        tickets,
        fetchTickets,
        users,
        fetchUsers,
        removeUser
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export const useContextApi = () => {
  const context = useContext(ContextApi);

  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
