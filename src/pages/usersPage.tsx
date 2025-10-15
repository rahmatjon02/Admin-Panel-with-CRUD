import {
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useUsers,
  useAddUser,
  useDeleteUser,
  useUpdateUser,
} from "../hooks/useUsers";
import type { User } from "../types/user";
import { useThemeStore } from "../hooks/useThemeStore";

type FormValues = Omit<User, "id">;

export const UsersPage = () => {
  const { data, isLoading } = useUsers();
  const addUser = useAddUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const { theme } = useThemeStore();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data
      .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
      .filter((e) => {
        if (status === "all") return true;
        return e.role.toString() === status;
      });
  }, [data, search, status]);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      role: "user",
    },
  });

  const handleAddOpen = () => {
    reset({ name: "", email: "", role: "user" });
    setEditId(null);
    setOpen(true);
  };

  const handleEditOpen = (user: any) => {
    setEditId(user.id);
    reset({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setOpen(true);
  };

  const onSubmit = (values: FormValues) => {
    if (editId) {
      updateUser.mutate(
        { id: editId, ...values },
        {
          onSuccess: () => {
            setOpen(false);
            reset();
            setEditId(null);
          },
        }
      );
    } else {
      addUser.mutate(values, {
        onSuccess: () => {
          setOpen(false);
          reset();
        },
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Users</h2>

        <div className="w-2/3 flex items-center justify-center">
          <TextField
            label="Search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[70%] "
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="all">
                <em>All</em>
              </MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button variant="contained" size="large" onClick={handleAddOpen}>
          Add User
        </Button>
      </div>

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
            {filteredData?.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    color="success"
                    onClick={() => handleEditOpen(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => deleteUser.mutate(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? "Edit User" : "Add New User"} </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className="flex flex-col gap-4 mt-2">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select {...field} fullWidth>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              )}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
