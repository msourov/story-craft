import { StoryImage } from "@/components/Homepage/StoryImage";
import { Text, Box } from "@mantine/core";
import { ObjectId } from "mongodb";

interface Story {
  _id: ObjectId;
  title: string;
  content: string;
  authorId: ObjectId;
  tags: string[];
  likes: number;
  views: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  popularity: number;
}

type StoryPageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const stories: Story[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stories?featured=true`
  ).then((res) => res.json());

  return stories.slice(0, 3).map((story) => ({
    id: story._id.toString(),
  }));
}

const StoryPage = async ({ params }: StoryPageProps) => {
  const { id } = params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stories/${id}`,
    {
      next: { revalidate: 60 },
    }
  );
  const story = await response.json();

  if (!story) return <Text>Loading...</Text>;

  return (
    <Box className="w-[90%] md:w-[70%] lg:w-[50%] mx-auto flex flex-col items-center my-12">
      <Text fw="700" size="xl">
        {story.title}
      </Text>
      <StoryImage id={id} />
      <Text mt={20} className="lg:w-[70%]">
        {story.content}
      </Text>
      {/* Display other story details as needed */}
    </Box>
  );
};

export default StoryPage;
