import { Story } from "@/app/types";
import { Box, Group, Pill, PillGroup, Text } from "@mantine/core";

const Features = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stories?featured=true`,
    {
      cache: "no-store",
    }
    // { next: { revalidate: 604800 } }
  );
  const featuredStories: Story[] = await response.json();
  console.log("featuredStories.slice(3)", featuredStories.slice(3));
  return (
    <Box
      className=" text-[#4A374E] px-8 py-8 md:py-12 bg-[#C7DCA2] \
    flex flex-col justify-center items-center"
    >
      <Text fw="700" c="black" size="xl" mb={30}>
        Featured Stories
      </Text>
      <Box className="flex justify-center w-[80%]">
        {featuredStories.slice(0, 3).map((item) => (
          <Box key={item?._id.toString()} className="text-left px-8 py-4">
            <Text c="dark" fw={700} className="text-center">
              {item.title}
            </Text>
            <Text>{item.content}</Text>
            <Text className="space-x-2" my={10}>
              {item?.tags.map((tag, index) => (
                <Pill key={`${tag}-${index}`}>{tag}</Pill>
              ))}
            </Text>
            <Text c="dimmed">
              <Text component="span" fw="bold">
                {item.views}
              </Text>{" "}
              views
            </Text>
            <Text c="dimmed">
              <Text c="dimmed">
                <Text component="span" fw="bold">
                  {item.likes}
                </Text>{" "}
                likes
              </Text>
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Features;
