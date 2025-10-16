import { Routes, Route } from "react-router-dom";
import { Layout, ProductsPage, UsersPage } from "./pages/lazy";

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
