import { ObjectId } from "mongodb";

export interface Story {
  _id: ObjectId;
  title: string;
  content: string;
  authorId: ObjectId;
  tags: string[];
  likes: number;
  views: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  popularity: number;
}
