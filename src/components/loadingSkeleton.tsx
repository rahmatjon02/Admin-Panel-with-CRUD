import { Box, Skeleton } from "@mui/material";
import { memo } from "react";

const LoadingSkeleton = () => {
  return (
    <Box className="w-full p-4">
      {[...Array(3)].map((_, i) => (
        <Box key={i} mb={2}>
          <Skeleton height={30} />
          <Skeleton animation="wave" height={30} />
          <Skeleton animation={false} height={30} />
        </Box>
      ))}
    </Box>
  );
};

export default memo(LoadingSkeleton);
