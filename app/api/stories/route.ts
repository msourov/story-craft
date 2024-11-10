import { Story } from "@/app/types";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const collection = await getCollection("stories");
    const url = request.nextUrl.searchParams;
    const genre = url.get("genre");
    const featured = url.get("featured");
    const sortParam = url.get("sort");

    if (genre) {
      const genres = await collection.distinct("tags");
      console.log(genres, "returning genres");
      return NextResponse.json({ status: true, data: genres });
    }

    let sortOption: Record<string, 1 | -1> | null = null;

    if (sortParam === "popularity") {
      sortOption = { popularity: -1 };
    } else if (sortParam === "latest") {
      sortOption = { createdAt: -1 };
    }

    const stories = await collection
      .find(featured === "true" ? { featured: true } : {})
      .sort(sortOption || {})
      .toArray();

    const formattedStories: Story[] = stories.map((story) => ({
      _id: story._id,
      title: story.title as string,
      content: story.content as string,
      authorId: story.authorId as ObjectId,
      tags: story.tags as string[],
      likes: story.likes as number,
      views: story.views as number,
      featured: story.featured as boolean,
      createdAt: story.createdAt as Date,
      updatedAt: story.updatedAt as Date,
      popularity: story.popularity as number,
    }));
    return NextResponse.json(formattedStories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}
