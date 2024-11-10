import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "..", ".env.local") });
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = "story_craft";

if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const client = new MongoClient(MONGODB_URI);
try {
  await client.connect();
  console.log("connected to MongoDB");
  const db = client.db(DB_NAME);
  const storiesCollection = db.collection("stories");
  const commentsCollection = db.collection("comments");
  const usersCollection = db.collection("users");
  const authorStatsCollection = db.collection("authorStats");

  const authorStats = await storiesCollection
    .aggregate([
      {
        $match: { authorId: { $exists: true } },
      },
      {
        $group: {
          _id: "$authorId",
          totalStories: { $sum: 1 },
          storyIds: { $push: "$_id" },
          totalLikes: { $sum: "$likes" },
          totalViews: { $sum: "$views" },
        },
      },
      {
        // Lookup to join comments based on storyIds array
        $lookup: {
          from: "comments",
          localField: "storyIds",
          foreignField: "storyId",
          as: "comments",
        },
      },
      {
        $project: {
          authorId: "$_id",
          totalStories: 1,
          storyIds: 1,
          totalLikes: 1,
          totalViews: 1,
          totalComments: { $size: "$comments" },
        },
      },
    ])
    .toArray();

  for (const stat of authorStats) {
    await authorStatsCollection.updateOne(
      { authorId: stat.authorId },
      {
        $set: {
          authorId: stat.authorId,
          totalStories: stat.totalStories,
          storyIds: stat.storyIds,
          totalLikes: stat.totalLikes,
          totalViews: stat.totalViews,
          totalComments: stat.totalComments,
        },
      },
      { upsert: true }
    );
  }
} catch (error) {
  console.error("Error updating author stats:", error);
} finally {
  await client.close();
  console.log("Database connection closed");
}
