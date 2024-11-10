import { Story } from "@/app/types";
import { Box, Pill, SimpleGrid, Text } from "@mantine/core";
import { StoryNavButton } from "./StoryNavButton";
import { StoryImage } from "./StoryImage";

const Features = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stories?featured=true`,
    { next: { revalidate: 604800 } }
  );
  const featuredStories: Story[] = await response.json();

  return (
    <Box
      className=" text-[#330505] md:px-6 py-6 md:py-8 bg-[#F5F3F8] \
    flex flex-col justify-center items-center"
    >
      <Text fw="700" size="xl" mb={20}>
        Featured Stories
      </Text>
      <Box className="flex justify-center gap-4 w-[90%] lg:w-[80%] flex-col lg:flex-row">
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {featuredStories.slice(0, 3).map((item) => (
            <Box
              key={item?._id.toString()}
              className="text-left px-4 md:px-6 lg:px-8 py-4 bg-[#ECE8F3] rounded-md border-rose-950 shadow-xl border-b-8"
            >
              <Text c="#3A2449" fw={900} mb={10} className="sm:text-center">
                {item.title}
              </Text>
              <Box className="rounded-lg overflow-hidden shadow-sm">
                <StoryImage id={item._id.toString()} />
              </Box>

              <Text mt={20} lineClamp={3} className="block">
                {item.content}
              </Text>
              <StoryNavButton id={item?._id.toString()} />
              {/* <Button variant="subtle">read more...</Button> */}
              <Box>
                <Text className="space-x-2" my={10}>
                  {item?.tags.map((tag, index) => (
                    <Pill key={`${tag}-${index}`}>{tag}</Pill>
                  ))}
                </Text>
                <Text fw="normal">{item.views} views</Text>{" "}
                <Text fw="normal">{item.likes} likes</Text>{" "}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Features;
