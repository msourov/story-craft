import { Box, Card, Text } from "@mantine/core";
import { Story } from "../types";
import { StoryImage } from "@/components/Homepage/StoryImage";

const StoriesPage = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stories`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stories");
  }

  const stories: Story[] = await response.json();

  return (
    <div className="flex justify-center">
      {/* <div className="w-[20%] border border-b-2 h-screen"></div> */}
      <Box className="flex flex-col w-[90%] gap-4">
        {stories.map((story) => (
          <Card key={story._id.toString()} withBorder w="full" px={30} py={20}>
            <Text className="text-center" c="dimmed" fw="bold" mb={10}>
              {story.title}
            </Text>
            <Box className="flex gap-6">
              <div className="flex-shrink-0">
                <StoryImage
                  id={story._id.toString()}
                  width={240}
                  height={160}
                />
              </div>
              <Box>{story.content}</Box>
            </Box>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default StoriesPage;
