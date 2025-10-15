import { Routes, Route } from "react-router-dom";

import { UsersPage } from "./pages/usersPage";
import Layout from "./pages/layout";
import { ProductsPage } from "./pages/productsPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductsPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
};
