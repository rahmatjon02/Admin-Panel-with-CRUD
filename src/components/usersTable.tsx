import { memo } from "react";
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
} from "@mui/material";
import { useThemeStore } from "../hooks/zustand/useThemeStore";
import type { User } from "../types/user";
import { Edit, Trash } from "lucide-react";

const UsersTable = ({ filteredData, onEdit, onDelete, isLoading }: any) => {
  const { theme } = useThemeStore();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead
          className={`${theme === "light" ? "bg-[#f5f5f5]" : "bg-[#151515]"} `}
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
          {filteredData?.map((user: User) => (
            <TableRow key={user.id} hover>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell align="center">
                <Button size="small" onClick={onEdit}>
                  <Edit />
                </Button>
                <Button size="small" color="error" onClick={onDelete}>
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

export default memo(UsersTable);
