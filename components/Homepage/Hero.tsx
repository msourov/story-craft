import React from "react";
import Image from "next/image";
import hero from "../../public/images/hero.png";
import { Button } from "@mantine/core";
import { NotebookPen } from "lucide-react";
import BrowseStories from "../Buttons/BrowseStories";

const Hero = () => {
  return (
    <div
      className="text-center gap-2 md:gap-8 lg:gap-0 px-8 py-8 md:py-16 lg:py-20 bg-[#46344B] \
    flex md:flex-row flex-col justify-around items-center text-yellow-500"
      // style={{
      //   background:
      //     "linear-gradient(60deg, rgba(199,172,146,1) 50%, rgba(133,148,114,1) 50%), rgb(133,148,114)", // Combined backgrounds
      // }}
    >
      <div className="w-full md:max-w-[35%] sm:w-[90%] sm:text-left z-10">
        <h2>Share your story with the world</h2>
        <p className="my-3 mt-4 ">
          Want to talk about an interesting event, take a load off your chest,
          discuss your favorite topic?
        </p>
        <p className="text-[#F8C735] bg-gradient-to-bl">
          This is the platform for you!
        </p>
      </div>
      <div>
        <div className="absolute left-[55%] top-[20%] md:left-[30%] md:top-[30%] w-24 h-24 bg-green-800 rounded-full" />
        {/* <div className="absolute left-[25%] top-[38%] md:left-[60%] md:top-[20%] w-16 h-16 bg-yellow-400 rounded-full" /> */}
        <div className="absolute left-[10%] top-[30%] md:left-[12%] md:top-[18%] w-16 h-16 bg-purple-800 rounded-full" />
        <NotebookPen
          color="#87c4bd"
          strokeWidth={0.5}
          className="absolute invisible md:visible w-32 h-44 -rotate-12 left-[62%] top-[15%]"
        />
        <div className="relative w-60 h-64 md:w-72">
          <Image
            src={hero}
            placeholder="blur"
            alt="Hero image"
            fill
            sizes="25vw"
            objectFit="cover"
          />
        </div>
        <BrowseStories />
      </div>
    </div>
  );
};

export default Hero;
