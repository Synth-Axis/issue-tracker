import { Box } from "@radix-ui/themes";
import { Skeleton } from "../../components";

const LoadingIssuesPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingIssuesPage;
