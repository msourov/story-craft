import { Box } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box className="flex">
      <div className="w-[20%] border h-screen"></div>
      <div className="w-[60%] border">{children}</div>
    </Box>
  );
}
