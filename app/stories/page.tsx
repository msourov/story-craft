interface Story {
  _id: string;
  title: string;
}

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
      <ul className="flex flex-col gap-4 py-10 text-center">
        {stories.map((story) => (
          <li key={story._id}>{story.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default StoriesPage;
