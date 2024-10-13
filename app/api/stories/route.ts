import { getCollection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const collection = await getCollection("stories");
    const stories = await collection.find({}).toArray();
    return NextResponse.json(stories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}
