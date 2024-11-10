"use client";

import { CldImage } from "next-cloudinary";

type StoryImagesProps = {
  id: string;
  width: number;
  height: number;
};

export const StoryImage = ({
  id,
  width = 600,
  height = 400,
}: StoryImagesProps) => {
  return (
    <CldImage
      src={`story-craft/${id}`}
      width={width}
      height={height}
      crop="fill"
      gravity="auto"
      alt={`image_id${id}`}
      placeholder="blur"
      blurDataURL={`https://res.cloudinary.com/dgozusvua/image/upload/e_blur:200,q_10/story-craft/${id}`}
    />
  );
};
