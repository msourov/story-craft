import React from "react";
import Image from "next/image";
import hero from "../../public/images/hero.png";
import { Button } from "@mantine/core";

const Hero = () => {
  return (
    <div
      className="text-center gap-8 px-8 py-8 md:py-12 lg:py-16 bg-[#859472] \
    flex md:flex-row flex-col-reverse justify-around items-center"
      // style={{
      //   background:
      //     "linear-gradient(60deg, rgba(199,172,146,1) 50%, rgba(133,148,114,1) 50%), rgb(133,148,114)", // Combined backgrounds
      // }}
    >
      <div className="w-full md:max-w-[35%] sm:w-[90%] sm:text-left">
        <h2>Share your story with the world</h2>
        <p className="my-3 mt-4 ">
          Want to talk about an interesting event, take a load off your chest,
          discuss your favorite topic?
        </p>
        <p className="text-yellow-500 bg-gradient-to-bl">
          This is the platform for you!
        </p>
      </div>
      <div>
        <div className="absolute w-24 h-24 bg-green-800 rounded-full" />
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
          <Image
            src={hero}
            placeholder="blur"
            alt="Hero image"
            fill
            sizes="25vw"
            objectFit="cover"
          />
        </div>
        <Button
          color="rgba(164, 74, 63)"
          variant="filled"
          bg="[#A44A3F]"
          className="mt-4"
        >
          Create your story
        </Button>
      </div>
    </div>
  );
};

export default Hero;
