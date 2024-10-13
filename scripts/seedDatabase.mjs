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

const tags = [
  "fiction",
  "non-fiction",
  "mystery",
  "romance",
  "sci-fi",
  "fantasy",
  "thriller",
  "horror",
  "adventure",
  "historical",
  "contemporary",
  "young-adult",
  "children",
  "comedy",
  "drama",
  "action",
  "suspense",
  "crime",
  "biography",
  "self-help",
  "poetry",
  "essay",
  "short-story",
  "dystopian",
  "paranormal",
  "western",
  "literary-fiction",
  "satire",
];

const data = [
  {
    title: "The Lost Compass",
    description:
      "When Ethan stumbles upon an ancient compass during a hike, he finds it doesn't point north. Instead, it leads him to mysterious places long forgotten by time. But each step reveals more than just adventure; it uncovers secrets that could change history.",
  },
  {
    title: "Whispers in the Wind",
    description:
      "In a quiet town nestled between mountains, the wind carries more than just air—it carries whispers. Young Eliza discovers she can hear them, leading her on a journey to uncover an old tragedy and the restless souls trying to find peace.",
  },
  {
    title: "Echoes of Tomorrow",
    description:
      "As the first human time traveler, Mia knew her mission was crucial. But when she accidentally changes a minor detail in the past, she sets off a chain reaction that threatens the future. Can she fix it before time runs out?",
  },
  {
    title: "The Silent Sea",
    description:
      "Captain Jonas embarks on a perilous journey across the Silent Sea, a treacherous stretch of ocean where no ship has ever returned. What he discovers beneath the calm waters is a forgotten civilization and a power beyond imagination.",
  },
  {
    title: "The Last of the Green",
    description:
      "In a future where nature has all but vanished, Lily stumbles upon the last surviving forest hidden in a forgotten valley. As corporations close in to claim it, she must rally others to protect what could be the key to humanity’s survival.",
  },
  {
    title: "The Mirror's Edge",
    description:
      "Every mirror reflects the same world—or so Emily thought. After accidentally breaking one, she finds herself stepping into a parallel universe where everything is familiar, yet wrong. Now she must find her way back before she loses herself.",
  },
  {
    title: "The Forgotten City",
    description:
      "While exploring the dense Amazon rainforest, archaeologist Mark uncovers a city lost to time. But the deeper he goes, the more he realizes that the city's ancient inhabitants may not be as extinct as he believed.",
  },
  {
    title: "A Song for the Stars",
    description:
      "Sophie, a talented yet reclusive musician, finds herself composing a melody she hears only in her dreams. As the song grows, she discovers its origin is from a faraway galaxy, calling her to a destiny she could never have imagined.",
  },
  {
    title: "Beneath the Ice",
    description:
      "A research team ventures to Antarctica to study a strange energy signal beneath the ice. What they find is not just scientific discovery, but evidence of an ancient alien civilization frozen for millennia—and it’s beginning to wake up.",
  },
  {
    title: "The Timekeeper's Daughter",
    description:
      "Amelia has always known her father’s old pocket watch was special. But when it starts to tick backward, she is pulled into a world where time flows differently. To return home, she must master the rules of time and outsmart those who wish to control it.",
  },
  {
    title: "Shadows of the Forgotten",
    description:
      "In a small coastal village, every full moon brings the appearance of strange, shadowy figures. When young artist Leo decides to paint them, he unknowingly begins to uncover their tragic past and the curse that binds them to the shore.",
  },
  {
    title: "The Wolf’s Pact",
    description:
      "After losing his family to a mysterious beast, Arthur makes a pact with the wolves of the forest to track it down. But the more he learns about the creature, the more he questions who the real monster is—man or beast?",
  },
  {
    title: "Crimson Skies",
    description:
      "In a world where the sky turns red at dusk, a rare celestial event foretells the rise of a hero. Young pilot Zara must navigate the dangerous skies to uncover the truth behind the prophecy before an ancient evil awakens.",
  },
  {
    title: "The Glass Castle",
    description:
      "Hidden in the misty mountains lies a castle made entirely of glass, where no one is allowed to enter. When a daring adventurer named Finn sneaks inside, he discovers its purpose—to protect an imprisoned spirit with the power to reshape reality.",
  },
  {
    title: "Wings of Ash",
    description:
      "In a world where fire-born creatures once ruled the skies, the last phoenix has been reborn. Young warrior Kira must protect it from those who seek its power, but to do so, she must unlock the ancient magic within herself.",
  },
  {
    title: "The Paper Boat",
    description:
      "On a rainy afternoon, young Alex folds a paper boat and sends it down a stream, only to watch it disappear into a whirlpool. The next day, the boat returns, carrying with it a message from a forgotten world beyond the waters.",
  },
  {
    title: "The Night Circus",
    description:
      "A mysterious circus arrives in town, only open at night. When the performers begin to vanish one by one, 16-year-old Clara must solve the riddle of the circus before it vanishes completely—and takes her with it.",
  },
  {
    title: "The Dreamweaver",
    description:
      "Every night, Felix dreams of vivid worlds and strange creatures. But when those dreams start blending into reality, he realizes he's not just dreaming—he’s creating. And now, something dark from his dreams is following him into the waking world.",
  },
  {
    title: "The Phantom's Mask",
    description:
      "In a city plagued by a series of mysterious disappearances, detective Mira finds a peculiar mask at every crime scene. When she puts it on, she gains the ability to see into the world of the dead—leading her to a shocking truth about the city's past.",
  },
  {
    title: "The Serpent's Tear",
    description:
      "Legends tell of a gemstone known as the Serpent's Tear, capable of granting immense power. When thief-turned-hero Arin is tasked with stealing it, he discovers its curse—those who possess it are destined to lose what they cherish most.",
  },
];

const seedDatabase = async () => {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("connected to MongoDB");
    const db = client.db(DB_NAME);
    const storiesCollection = db.collection("stories");
    const usersCollection = db.collection("users");
    const commentsCollection = db.collection("comments");

    await storiesCollection.createIndex({ "author.id": 1 });
    await storiesCollection.createIndex({ tags: 1 });
    await storiesCollection.createIndex({ createdAt: -1 });

    await storiesCollection.deleteMany({});
    await usersCollection.deleteMany({});
    await commentsCollection.deleteMany({});

    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatarGitHub(),
        createdAt: faker.date.past(),
      };
      users.push(user);
    }

    const insertedUsers = await usersCollection.insertMany(users);
    const userIds = Object.values(insertedUsers.insertedIds);

    const stories = [];
    for (let i = 0; i < 20; i++) {
      const story = {
        title: data[i].title,
        content: data[i].description,
        authorId: faker.helpers.arrayElement(userIds),
        tags: faker.helpers.arrayElements(
          tags,
          faker.number.int({ min: 1, max: 4 })
        ),
        likes: faker.number.int({ min: 0, max: 100 }),
        views: faker.number.int({ min: 0, max: 1000 }),
        featured: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
      stories.push(story);
    }

    const insertedStories = await storiesCollection.insertMany(stories);
    const storyIds = Object.values(insertedStories.insertedIds);

    const comments = [];
    for (let i = 0; i < 50; i++) {
      const comment = {
        storyId: faker.helpers.arrayElement(storyIds),
        authorId: faker.helpers.arrayElement(userIds),
        content: faker.lorem.sentence(),
        createdAt: faker.date.past(),
      };
      comments.push(comment);
    }

    await commentsCollection.insertMany(comments);

    console.log(
      "Database seeded successfully with users, stories, and comments"
    );
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    console.log("Closing database connection...");
    await client.close();
    console.log("Database connection closed");
  }
};

seedDatabase();
