import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { User } from "../../types/user";

const API_URL = "http://localhost:3000/users";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data;
    },
  });
};

export const useAddUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<User, "id">) => {
      const { data } = await axios.post(API_URL, payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      const { data } = await axios.put(`${API_URL}/${user.id}`, user);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};
