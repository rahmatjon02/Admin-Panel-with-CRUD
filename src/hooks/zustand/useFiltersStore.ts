// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface ProductsFilterState {
//   search: string;
//   status: string;
//   setSearch: (value: string) => void;
//   setStatus: (value: string) => void;
//   resetFilters: () => void;
// }

// export const useProductsFilterStore = create<ProductsFilterState>()(
//   persist(
//     (set) => ({
//       search: "",
//       status: "all",
//       setSearch: (value) => set({ search: value }),
//       setStatus: (value) => set({ status: value }),
//       resetFilters: () => set({ search: "", status: "all" }),
//     }),
//     {
//       name: "products-filters",
//     }
//   )
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";

// PRODUCT
interface ProductFilterStore {
  search: string;
  status: string;
  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
}

export const useProductsFilterStore = create<ProductFilterStore>()(
  persist(
    (set) => ({
      search: "",
      status: "all",
      setSearch: (value) => set({ search: value }),
      setStatus: (value) => set({ status: value }),
    }),
    { name: "products-filters" }
  )
);

// USER
interface UsersFilterState {
  search: string;
  status: string;
  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
}

export const useUsersFilterStore = create<UsersFilterState>()(
  persist(
    (set) => ({
      search: "",
      status: "all",
      setSearch: (value) => set({ search: value }),
      setStatus: (value) => set({ status: value }),
    }),
    {
      name: "users-filters",
    }
  )
);
