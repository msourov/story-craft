import { getCollection } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const collection = await getCollection("blogs");
    const blogs = await collection.find({}).toArray();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
