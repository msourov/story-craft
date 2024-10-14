import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";
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

const updatePopularityScore = async () => {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("connected to mongoDB");

    const db = client.db(DB_NAME);
    const storiesCollection = db.collection("stories");
    const commentsCollection = db.collection("comments");

    const stories = await storiesCollection.find({}).toArray();
    for (const story of stories) {
      const commentsCount = await commentsCollection.countDocuments({
        storyId: story._id,
      });
      const popularity = story.likes * 2 + story.views + commentsCount * 5;

      await storiesCollection.updateOne(
        { _id: story._id },
        { $set: { popularity } }
      );
    }
    console.log("Popularity scores updated successfully.");
  } catch (error) {
    console.error("Error updating popularity scores:", error);
  } finally {
    await client.close();
    console.log("Database connection closed");
  }
};

updatePopularityScore();
