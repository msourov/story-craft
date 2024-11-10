"use client";

import { Box, Card, Chip, Group } from "@mantine/core";
import React, { FC } from "react";

interface GenreProps {
  genres: string[];
}

const SidebarChips: FC<GenreProps> = ({ genres }) => {
  return (
    <Box>
      <Chip.Group multiple={false}>
        <Group gap="xs">
          {genres.map((item) => (
            <Chip key={item} value={item} color="black" icon={null}>
              {item}
            </Chip>
          ))}
        </Group>
      </Chip.Group>
    </Box>
  );
};

export default SidebarChips;
