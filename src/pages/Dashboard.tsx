import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "../hooks/usePagination";
import { ProductCard } from "../components/ProductCard";
import { AppDispatch, RootState } from "../store";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { ProductForm } from "../components/ProductForm";
import { Search } from "lucide-react";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
  openCreateProductDialog,
  openDeleteProductDialog,
  openEditProductDialog,
  updateProducts,
} from "../store/slices/ProductSlice";
import { Product } from "../types/common";

export const Dashboard = () => {
  const products = useSelector((state: RootState) => state?.product?.products);
  const isLoading = useSelector(
    (state: RootState) => state?.product?.isLoading
  );
  const deleteProductDialog = useSelector(
    (state: RootState) => state?.product?.deleteProductDialog
  );
  const editProductDialog = useSelector(
    (state: RootState) => state?.product?.editProductDialog
  );
  const createProductDialog = useSelector(
    (state: RootState) => state?.product?.createProductDialog
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const dispatch = useDispatch<AppDispatch>();
  const { startIndex, endIndex, pageNumbers } = usePagination(
    products.length,
    itemsPerPage,
    currentPage
  );

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const displayedProducts = filteredProducts.slice(startIndex, endIndex);
  const closeDeleteDialog = () => {
    dispatch(openDeleteProductDialog({ isOpen: false, record: null }));
  };
  const closeEditDialog = () => {
    dispatch(openEditProductDialog({ isOpen: false, record: null }));
  };
  const closeCreateDialog = () => {
    dispatch(openCreateProductDialog({ isOpen: false, record: null }));
  };
  const onDeleteProduct = () => {
    const id = String(deleteProductDialog?.record?.id ?? "");
    dispatch(deleteProduct(id));
    closeDeleteDialog();
    const data = products?.filter((prod) => String(prod?.id) !== id);
    dispatch(updateProducts(data));
  };
  const onEditProduct = (payload: Product) => {
    dispatch(editProduct(payload));
    const data = products?.map((prod) =>
      prod?.id === payload?.id ? payload : prod
    );
    dispatch(updateProducts(data));
  };
  const onCreateProduct = (payload: Product) => {
    dispatch(addProduct(payload));
    const data = [payload, ...products];
    dispatch(updateProducts(data));
  };
  return (
    <div className=" mx-auto p-6  min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="w-2/3">
          <div className="relative">
            <input
              name="confirmPassword"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-3 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            dispatch(openCreateProductDialog({ isOpen: true, record: null }));
          }}
          className="cursor-pointer py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="transform transition-all duration-300"
                style={{
                  animationDelay: `${index * 150}ms`,
                  opacity: isLoading ? 1 : 0,
                }}
              >
                <ProductCardSkeleton />
              </div>
            ))
          : displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={(product) => {
                  dispatch(
                    openEditProductDialog({ isOpen: true, record: product })
                  );
                }}
                onDelete={(product) => {
                  dispatch(
                    openDeleteProductDialog({ isOpen: true, record: product })
                  );
                }}
              />
            ))}
      </div>
      {deleteProductDialog?.isOpen && (
        <ConfirmationModal
          isOpen={deleteProductDialog?.isOpen}
          onClose={closeDeleteDialog}
          onConfirm={onDeleteProduct}
          title={"Delete Product"}
          message={"Are you sure for Delete this Product?"}
        />
      )}
      {editProductDialog?.isOpen && (
        <ProductForm
          isOpen={editProductDialog?.isOpen}
          onCancel={closeEditDialog}
          onSubmit={onEditProduct}
          title={"Edit Product"}
          product={editProductDialog?.record ?? undefined}
        />
      )}
      {createProductDialog?.isOpen && (
        <ProductForm
          isOpen={createProductDialog?.isOpen}
          onCancel={closeCreateDialog}
          onSubmit={onCreateProduct}
          title={"Add Product"}
        />
      )}
      {displayedProducts?.length > 0 && (
        <div className="flex justify-center mt-8 space-x-3">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
