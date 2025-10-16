import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  FormControl,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useProducts,
  useAddProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "../hooks/react-query/useProducts";
import { useProductsFilterStore } from "../hooks/zustand/useFiltersStore";
import ProductTable from "../components/productTable";
import type { Product } from "../types/product";
import { Plus } from "lucide-react";

type FormValues = {
  name: string;
  price: number;
  inStock: boolean;
};

const ProductsPage = () => {
  const { data, isLoading } = useProducts();
  const addProduct = useAddProduct();
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();

  const { search, status, setSearch, setStatus } = useProductsFilterStore();

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

  const handleAddOpen = useCallback(() => {
    reset({ name: "", price: 0, inStock: true });
    setEditId(null);
    setOpen(true);
  }, [reset]);

  const handleEditOpen = useCallback(
    (product: Product) => {
      setEditId(product.id);
      reset({
        name: product.name,
        price: product.price,
        inStock: product.inStock,
      });
      setOpen(true);
    },
    [reset]
  );

  const onSubmit = useCallback(
    (values: FormValues) => {
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
    },
    [editId, updateProduct, addProduct, reset]
  );

  const handleDelete = useCallback(
    (id: number) => {
      deleteProduct.mutate(id);
    },
    [deleteProduct]
  );

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
          <FormControl className="!m-1 !min-w-[120px]">
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="true">In Stock</MenuItem>
              <MenuItem value="false">Out of Stock</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button
          variant="contained"
          size="large"
          onClick={handleAddOpen}
          className="!capitalize"
        >
          <Plus size={18} className="mr-2" /> Add Product
        </Button>
      </div>

      <ProductTable
        filteredData={filteredData}
        onEdit={handleEditOpen}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
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
                  label={`${field.value ? "In Stock" : "Out of Stock"}`}
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

export default ProductsPage;
