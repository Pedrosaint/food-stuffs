import { Spinner, Skeleton, SkeletonText, SkeletonCard } from "./loading";

// 1. TABLE DATA LOADING - Best for lists/tables
const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="space-y-3">
      {/* Table Header Skeleton */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-3/4" />
        ))}
      </div>

      {/* Table Rows Skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4" />
          ))}
        </div>
      ))}
    </div>
  );
};

// 2. CARD LIST LOADING - Best for card grids
const CardListSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

// 3. PROFILE/DETAILS LOADING - Best for detailed views
const ProfileSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      {/* Content sections */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-1/4" />
        <SkeletonText lines={3} />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-5 w-1/4" />
        <SkeletonText lines={2} />
      </div>
    </div>
  );
};

// 4. SIMPLE SPINNER - Best for quick operations
const DataSpinner = ({ text = "Loading data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-3">
      <Spinner size="lg" />
      <p className="text-sm text-gray-600 animate-pulse">{text}</p>
    </div>
  );
};

// 5. INLINE LOADING - Best for small sections
const InlineLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <Spinner size="sm" />
      <span>{text}</span>
    </div>
  );
};

// 6. SEARCH RESULTS LOADING
const SearchSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border-b pb-4">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <SkeletonText lines={2} />
          <Skeleton className="h-3 w-1/4 mt-2" />
        </div>
      ))}
    </div>
  );
};

export {
  TableSkeleton,
  CardListSkeleton,
  ProfileSkeleton,
  DataSpinner,
  InlineLoader,
  SearchSkeleton,
};
