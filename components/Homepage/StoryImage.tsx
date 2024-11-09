"use client";

import { CldImage } from "next-cloudinary";

type StoryImagesProps = {
  id: string;
};

export const StoryImage = ({ id }: StoryImagesProps) => {
  return (
    <CldImage
      src={`story-craft/${id}`}
      width={600}
      height={400}
      crop="fill"
      gravity="auto"
      alt={`image_id${id}`}
      placeholder="blur"
      blurDataURL={`https://res.cloudinary.com/dgozusvua/image/upload/e_blur:200,q_10/story-craft/${id}`}
    />
  );
};
