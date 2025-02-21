import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Product } from "../types/common";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const discountPrice = product.price * 0.9;

  return (
    <div
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`w-full h-full object-contain transition-all duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          } ${imageLoading ? "opacity-0" : "opacity-100"}`}
          onLoad={() => setImageLoading(false)}
        />

        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => onEdit(product)}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 transition-colors cursor-pointer"
            title="Edit Product"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(product)}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 transition-colors cursor-pointer"
            title="Delete Product"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-md capitalize">
            {product?.category || "Category"}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-600">
              {product?.rating || "4.5"}
            </span>
            <svg
              className="w-4 h-4 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z" />
            </svg>
          </div>
        </div>
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1 capitalize">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-800">
              ${discountPrice.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
