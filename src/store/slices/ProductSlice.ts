import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "../../http-config/APIClient";
import { Product, ProductDialogState } from "../../types/common";

interface ProductState {
  isLoading: boolean;
  products: Product[];
  deleteProductDialog: ProductDialogState;
  editProductDialog: ProductDialogState;
  createProductDialog: ProductDialogState;
}
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const getAllProduct = createAsyncThunk<Product[]>(
  "product/get-all-product",
  async () => {
    const response = await apiClient<{ products: Product[] }>({
      method: "GET",
      url: `${BASE_URL}products`,
    });
    return response?.products ?? [];
  }
);

export const addProduct = createAsyncThunk<Partial<Product>, Partial<Product>>(
  "product/add-product",
  async (data) => {
    const response = await apiClient<{ product: Product }>({
      method: "POST",
      url: `${BASE_URL}products/add`,
      data,
    });
    return response?.product ?? {};
  }
);

export const editProduct = createAsyncThunk<Partial<Product>, Partial<Product>>(
  "product/edit-product",
  async (data) => {
    const response = await apiClient<{ product: Product }>({
      method: "PUT",
      url: `${BASE_URL}products/${data.id}`,
      data,
    });
    return response?.product ?? {};
  }
);

export const deleteProduct = createAsyncThunk<string, string>(
  "product/delete-product",
  async (id) => {
    await apiClient({
      method: "DELETE",
      url: `${BASE_URL}products/${id}`,
    });
    return id;
  }
);

const initialState: ProductState = {
  isLoading: false,
  products: [],
  deleteProductDialog: { isOpen: false, record: null },
  editProductDialog: { isOpen: false, record: null },
  createProductDialog: { isOpen: false, record: null },
};

const counterSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    openDeleteProductDialog: (
      state,
      action: PayloadAction<ProductDialogState>
    ) => {
      state.deleteProductDialog = action.payload;
    },
    openEditProductDialog: (
      state,
      action: PayloadAction<ProductDialogState>
    ) => {
      state.editProductDialog = action.payload;
    },
    openCreateProductDialog: (
      state,
      action: PayloadAction<ProductDialogState>
    ) => {
      state.createProductDialog = action.payload;
    },
    updateProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
        state.products = [];
      })
      .addCase(getAllProduct.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      });
  },
});

export const {
  openDeleteProductDialog,
  openEditProductDialog,
  openCreateProductDialog,
  updateProducts,
} = counterSlice.actions;

export default counterSlice.reducer;
