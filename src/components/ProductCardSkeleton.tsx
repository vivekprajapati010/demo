const ShimmerEffect = () => {
  return (
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden relative">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gray-200" />
        <ShimmerEffect />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-4">
        {/* Category and Rating */}
        <div className="flex items-center justify-between">
          <div className="relative h-6 w-20 bg-gray-200 rounded-full overflow-hidden">
            <ShimmerEffect />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-12 bg-gray-200 rounded overflow-hidden">
              <ShimmerEffect />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="relative h-6 w-3/4 bg-gray-200 rounded overflow-hidden">
            <ShimmerEffect />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="relative h-4 w-full bg-gray-200 rounded overflow-hidden">
            <ShimmerEffect />
          </div>
          <div className="relative h-4 w-2/3 bg-gray-200 rounded overflow-hidden">
            <ShimmerEffect />
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-2">
            <div className="relative h-6 w-16 bg-gray-200 rounded overflow-hidden">
              <ShimmerEffect />
            </div>
            <div className="relative h-4 w-14 bg-gray-200 rounded overflow-hidden">
              <ShimmerEffect />
            </div>
          </div>
          <div className="relative h-10 w-28 bg-gray-200 rounded-lg overflow-hidden">
            <ShimmerEffect />
          </div>
        </div>
      </div>
    </div>
  );
};
