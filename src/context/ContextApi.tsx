"use client";


import { ProductDetails } from "@/types/product";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface ContextApiProps {
  wishlist: ProductDetails[];
  loading: boolean;
  error: string | null;
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

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <ContextApi.Provider value={{ wishlist, loading, error }}>
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
