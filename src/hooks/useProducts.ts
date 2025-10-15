import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Product } from "../types/product";

const API = "http://localhost:3000/products";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get(API);
      return data;
    },
  });
};

export const useAddProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Product, "id">) => {
      const { data } = await axios.post(API, payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      const { data } = await axios.put(`${API}/${product.id}`, product);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${API}/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};
