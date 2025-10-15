import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TextField,
  Box,
  Skeleton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useProducts,
  useAddProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "../hooks/useProducts";
import { useThemeStore } from "../hooks/useThemeStore";

type FormValues = {
  name: string;
  price: number;
  inStock: boolean;
};

export const ProductsPage = () => {
  const { data, isLoading } = useProducts();
  const addProduct = useAddProduct();
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();

  const {theme} = useThemeStore()

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
        return e.inStock.toString() === status;
      });
  }, [data, search, status]);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      price: 0,
      inStock: true,
    },
  });

  const handleAddOpen = () => {
    reset({ name: "", price: 0, inStock: true });
    setEditId(null);
    setOpen(true);
  };

  const handleEditOpen = (product: any) => {
    setEditId(product.id);
    reset({
      name: product.name,
      price: product.price,
      inStock: product.inStock,
    });
    setOpen(true);
  };

  const onSubmit = (values: FormValues) => {
    if (editId) {
      updateProduct.mutate(
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
      addProduct.mutate(values, {
        onSuccess: () => {
          setOpen(false);
          reset();
        },
      });
    }
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Products</h2>

        <div className="w-2/3 flex items-center justify-center">
          <TextField
            label="Search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[70%]"
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
              <MenuItem value="true">In Stock</MenuItem>
              <MenuItem value="false">Out of Stock</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button variant="contained" size="large" onClick={handleAddOpen}>
          Add Product
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead className={`${theme === "light" ? "bg-[#f5f5f5]" : "bg-[#151515]"} `}>
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
              <TableCell>
                <b>In Stock</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData?.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>
                  {p.inStock ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-red-600 font-medium">No</span>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    color="success"
                    onClick={() => handleEditOpen(p)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => deleteProduct.mutate(p.id)}
                  >
                    Delete
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? "Edit Product" : "Add New Product"}</DialogTitle>

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
              name="price"
              control={control}
              rules={{
                required: "Price is required",
                min: { value: 0.01, message: "Price must be greater than 0" },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Price"
                  type="number"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="inStock"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="In Stock"
                />
              )}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" type="submit">
              {editId ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
