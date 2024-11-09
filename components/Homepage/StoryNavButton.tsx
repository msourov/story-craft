"use client";

import { Text } from "@mantine/core";
import Link from "next/link";

type storyId = {
  id: string;
};

const handleStoryClick = (id: string) => {
  console.log(id);
};

export const StoryNavButton = ({ id }: storyId) => {
  return (
    <Link href={`/stories/${id}`} passHref>
      <Text size="md" mt={10} style={{ cursor: "pointer", opacity: "70%" }}>
        read more...
      </Text>
    </Link>
  );
};
