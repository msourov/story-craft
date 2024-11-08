import { Story } from "@/app/types";
import { Box, Pill, Text } from "@mantine/core";

const Features = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stories?featured=true`,
    { next: { revalidate: 604800 } }
  );
  const featuredStories: Story[] = await response.json();
  return (
    <Box
      className=" text-[#330505] md:px-6 py-6 md:py-12 bg-[#94A89A] \
    flex flex-col justify-center items-center"
    >
      <Text fw="700" c="black" size="xl" mb={20}>
        Featured Stories
      </Text>
      {/* <Divider w="50%" color="black" mb={10} /> */}
      <Box className="flex justify-center gap-4 w-[90%] md:w-[80%] flex-col lg:flex-row">
        {featuredStories.slice(0, 3).map((item) => (
          <Box
            key={item?._id.toString()}
            className="text-left px-4 md:px-6 py-4 border bg-[#D9D1C0] border-yellow-800 shadow-lg border-b-8"
          >
            <Text c="#3A2449" fw={900} mb={10} className="sm:text-center">
              {item.title}
            </Text>
            <Text>{item.content}</Text>
            <Text className="space-x-2" my={10}>
              {item?.tags.map((tag, index) => (
                <Pill key={`${tag}-${index}`}>{tag}</Pill>
              ))}
            </Text>
            <Text fw="normal">{item.views} views</Text>{" "}
            <Text fw="normal">{item.likes} likes</Text>{" "}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Features;
