import { Collection, Document } from "mongodb";
import clientPromise from "./mongodb";

export async function getCollection<T extends Document>(
  name: string
): Promise<Collection<T>> {
  const client = await clientPromise;
  return client.db().collection<T>(name);
}
