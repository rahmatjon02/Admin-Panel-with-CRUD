import {
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
} from "@mui/material";
import { memo, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useUsers,
  useAddUser,
  useDeleteUser,
  useUpdateUser,
} from "../hooks/react-query/useUsers";
import type { User } from "../types/user";
import { useUsersFilterStore } from "../hooks/zustand/useFiltersStore";
import UsersTable from "../components/usersTable";

type FormValues = Omit<User, "id">;

const UsersPage = () => {
  const { data, isLoading } = useUsers();
  const addUser = useAddUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const { search, setSearch, status, setStatus } = useUsersFilterStore();

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

  const handleDelete = (id: number) => {
    deleteUser.mutate(id);
  };

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
          <FormControl className="!m-1 !min-w-[120px]">
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="all">All</MenuItem>
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

      <UsersTable
        filteredData={filteredData}
        onEdit={handleEditOpen}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
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

export default memo(UsersPage);
