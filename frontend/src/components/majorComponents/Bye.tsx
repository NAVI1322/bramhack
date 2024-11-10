"use client";
import { Button } from "../ui/button";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Let's",
    },
    {
      text: "grow",
    },
    {
      text: "together",
    },
    {
      text: "with the",
    },
    {
      text: "nation.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[30rem] ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Improving one person at a time
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
<Button variant={"myButton"}>Join Now!</Button>

      </div>
    </div>
  );
}
