const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center">
      <div className="w-full max-w-xl space-y-4 p-6">
        <div className="h-6 w-1/3 bg-gray-800 animate-pulse rounded-lg"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-800 animate-pulse rounded-lg"></div>
          <div className="h-4 w-5/6 bg-gray-800 animate-pulse rounded-lg"></div>
          <div className="h-4 w-4/6 bg-gray-800 animate-pulse rounded-lg"></div>
        </div>
        <div className="h-48 w-full bg-gray-800 animate-pulse rounded-xl"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
