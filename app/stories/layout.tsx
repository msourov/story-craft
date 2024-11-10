import AllStoriesSidebar from "@/components/StoryPage/AllStoriesSidebar";
import { Box } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box className="flex h-screen">
      <div className="w-[20%] border max-h-screen sticky top-0">
        <AllStoriesSidebar />
      </div>
      <div className="w-[60%] border overflow-y-auto max-h-screen py-8">
        {children}
      </div>
    </Box>
  );
}
