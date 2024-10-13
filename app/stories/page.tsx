import React from "react";

interface Story {
  _id: string;
  title: string;
  // Add other fields as necessary
}

const StoriesPage = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stories`,
    {
      cache: "no-store", // Optional: to ensure fresh data on every request
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stories");
  }

  const stories: Story[] = await response.json();

  return (
    <div>
      <h1>Stories</h1>
      <ul>
        {stories.map((story) => (
          <li key={story._id}>{story.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default StoriesPage;