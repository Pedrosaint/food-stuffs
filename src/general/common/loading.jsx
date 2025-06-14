// Spinner Loading Component
const Spinner = ({ size = "default", className = "" }) => {
  const sizes = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizes[size]} ${className}`}
    />
  );
};

// Dots Loading Component
const Dots = ({ size = "default", className = "" }) => {
  const sizes = {
    sm: "h-1 w-1",
    default: "h-2 w-2",
    lg: "h-3 w-3",
  };

  return (
    <div className={`flex space-x-1 ${className}`}>
      <div
        className={`${sizes[size]} bg-blue-600 rounded-full animate-bounce`}
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className={`${sizes[size]} bg-blue-600 rounded-full animate-bounce`}
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className={`${sizes[size]} bg-blue-600 rounded-full animate-bounce`}
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
};

// Pulse Loading Component
const Pulse = ({ size = "default", className = "" }) => {
  const sizes = {
    sm: "h-8 w-8",
    default: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <div className="h-full w-full bg-blue-600 rounded-full animate-pulse opacity-75"></div>
    </div>
  );
};

// Bars Loading Component
const Bars = ({ size = "default", className = "" }) => {
  const sizes = {
    sm: "h-4",
    default: "h-6",
    lg: "h-8",
  };

  return (
    <div className={`flex items-end space-x-1 ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-1 bg-blue-600 rounded-t animate-pulse ${sizes[size]}`}
          style={{
            animationDelay: `${i * 100}ms`,
            animationDuration: "1s",
            animationIterationCount: "infinite",
          }}
        ></div>
      ))}
    </div>
  );
};

// Ring Loading Component
const Ring = ({ size = "default", className = "" }) => {
  const sizes = {
    sm: "h-6 w-6 border-2",
    default: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`animate-spin rounded-full border-gray-200 border-t-blue-600 ${sizes[size]} ${className}`}
    />
  );
};

// Main Loading Component with different variants
const Loading = ({
  variant = "spinner",
  size = "default",
  text = "",
  fullScreen = false,
  overlay = false,
  className = "",
}) => {
  const variants = {
    spinner: <Spinner size={size} />,
    dots: <Dots size={size} />,
    pulse: <Pulse size={size} />,
    bars: <Bars size={size} />,
    ring: <Ring size={size} />,
  };

  const content = (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      {variants[variant]}
      {text && (
        <p className="text-sm text-gray-600 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
        {content}
      </div>
    );
  }

  return content;
};

// Skeleton Loading Components
const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  );
};

const SkeletonText = ({ lines = 3, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
};

const SkeletonCard = ({ className = "" }) => {
  return (
    <div className={`p-6 border rounded-lg ${className}`}>
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
};

// Button Loading State
const LoadingButton = ({
  loading = false,
  children,
  variant = "spinner",
  disabled,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      className={`${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <div className="mr-2">
          {variant === "spinner" && (
            <Spinner size="sm" className="border-white border-t-transparent" />
          )}
          {variant === "dots" && (
            <Dots size="sm" className="[&>div]:bg-white" />
          )}
        </div>
      )}
      {children}
    </button>
  );
};

export {
  Loading,
  Spinner,
  Dots,
  Pulse,
  Bars,
  Ring,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  LoadingButton,
};
