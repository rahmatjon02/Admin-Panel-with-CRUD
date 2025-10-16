import React from "react";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Box,
  Skeleton,
} from "@mui/material";
import type { Product } from "../types/product";

import { useThemeStore } from "../hooks/zustand/useThemeStore";
import { Edit, Trash } from "lucide-react";

const ProductTable = ({ filteredData, onEdit, onDelete, isLoading }: any) => {
  const { theme } = useThemeStore();
  console.log("table product");

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead
          className={`${theme === "light" ? "bg-[#f5f5f5]" : "bg-[#151515]"}`}
        >
          <TableRow>
            <TableCell>
              <b>ID</b>
            </TableCell>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Price</b>
            </TableCell>
            <TableCell align="center">
              <b>In Stock</b>
            </TableCell>
            <TableCell align="center">
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredData?.map((p: Product) => (
            <TableRow key={p.id} hover>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>${p.price}</TableCell>
              <TableCell align="center">
                {p.inStock ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-600 font-medium">No</span>
                )}
              </TableCell>
              <TableCell align="center">
                <Button size="small" onClick={() => onEdit(p)}>
                  <Edit />
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => onDelete(p.id)}
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isLoading && (
        <Box className="!w-full">
          {[...Array(3)].map((_, i) => (
            <Box key={i}>
              <br />
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          ))}
        </Box>
      )}
    </TableContainer>
  );
};

export default React.memo(ProductTable);
