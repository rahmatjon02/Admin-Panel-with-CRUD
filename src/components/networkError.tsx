import { Info } from "lucide-react";
import { memo } from "react";

const NetworkError = () => {
  return (
    <div className="flex items-center gap-2 p-4 text-red-800 bg-red-100 border border-red-300 rounded-lg shadow-md">
      <Info />
      <span>Something went wrong. Check your internet connection.</span>
    </div>
  );
};

export default memo(NetworkError);
