import { Box, Card, Chip, Group, SimpleGrid, Title } from "@mantine/core";
import { FC } from "react";
import SidebarChips from "./SidebarChips";

const AllStoriesSidebar: FC = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stories?genre=true`
  );
  const { status, data: genres } = await response.json();

  if (!status) {
    console.error("Failed to fetch genres");
    return <div>Error loading genres</div>;
  }

  return (
    <div className="">
      <Card className="border-b-4">
        <h4 className="font-medium text-center text-cyan-600 mb-6">Genres</h4>
        <Box className="flex flex-1">
          <SidebarChips genres={genres} />
        </Box>
      </Card>
    </div>
  );
};

export default AllStoriesSidebar;
