import { Box } from "@mantine/core";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Box className="flex">
      <div className="w-[20%] border h-screen">Sidebar for Single Story</div>
      <div className="w-[80%]">{children}</div>
    </Box>
  );
}
