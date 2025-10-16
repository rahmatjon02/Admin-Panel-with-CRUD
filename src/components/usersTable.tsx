import { memo, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useThemeStore } from "../hooks/zustand/useThemeStore";
import type { User } from "../types/user";
import { Edit, Trash } from "lucide-react";

interface UserTableProps {
  filteredData: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

const UsersTable = ({
  filteredData,
  onEdit,
  onDelete,
  isLoading,
}: UserTableProps) => {
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
            } `}
          >
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Role</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((u: User) => (
              <TableRow key={u.id} hover>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => onEdit(u)}
                  >
                    <Edit size={18} />
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleOpenDialog(u.id)}
                  >
                    <Trash size={18} />
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
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

export default memo(UsersTable);
