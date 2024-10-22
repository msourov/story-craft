"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

const BrowseStories = () => {
  const router = useRouter();
  return (
    <Button
      color="rgba(164, 74, 63)"
      variant="filled"
      bg="[#A44A3F]"
      className="mt-4 md:mt-8"
      onClick={() => router.push("/stories")}
    >
      Browse Stories
    </Button>
  );
};

export default BrowseStories;
