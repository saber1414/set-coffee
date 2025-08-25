import { Product } from "@/types/product";
import React, { createContext, useContext, useState } from "react";

export interface ContextApiProps {
  products: Product[]
  loading: boolean,
  error: string | null
}

const ContextApi = createContext<ContextApiProps | null>(null);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState([])

  return <ContextApi.Provider value={{ products, loading, error }}>{children}</ContextApi.Provider>;
};

export const useContextApi = () => {
  const context = useContext(ContextApi);

  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
