import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { memo, useState } from "react";
import { Edit, Trash } from "lucide-react";
import { useThemeStore } from "../hooks/zustand/useThemeStore";
import type { Product } from "../types/product";
import LoadingSkeleton from "./loadingSkeleton";
import NetworkError from "./networkError";

interface ProductTableProps {
  filteredData: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
  isError: boolean;
}

const ProductTable = ({
  filteredData,
  onEdit,
  onDelete,
  isLoading,
  isError,
}: ProductTableProps) => {
  const { theme } = useThemeStore();

  const [openDialog, setOpenDialog] = useState(false);
  const [Id, setId] = useState<number | null>(null);

  const handleOpenDialog = (id: number) => {
    setId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setId(null);
  };

  const handleDelete = async () => {
    if (Id) {
      onDelete(Id);
      handleCloseDialog();
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            className={`${
              theme === "light" ? "bg-[#f5f5f5]" : "bg-[#151515]"
            } transition-colors`}
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
            {filteredData.map((p) => (
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
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => onEdit(p)}
                  >
                    <Edit size={18} />
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleOpenDialog(p.id)}
                  >
                    <Trash size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {isLoading && (
              <TableRow>
                <TableCell colSpan={5}>
                  <LoadingSkeleton />
                </TableCell>
              </TableRow>
            )}

            {isError && (
              <TableRow>
                <TableCell colSpan={5}>
                  <NetworkError />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(ProductTable);
