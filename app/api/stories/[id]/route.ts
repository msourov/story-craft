import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: ObjectId } }
) {
  const { id } = params;
  try {
    const collection = await getCollection("stories");
    const story = await collection.findOne({ _id: new ObjectId(id) });
    console.log("story", story);
    //   const story = fetchStoryById(id);

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (error) {
    console.error("Error fetching story:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
