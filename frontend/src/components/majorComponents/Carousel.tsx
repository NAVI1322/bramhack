import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const cardData = [
  {
    title: "Sustainable Commuting",
    description: "Embrace electric bikes as a green alternative to reduce your carbon footprint while commuting.",
  },
  {
    title: "Affordable Travel Solutions",
    description: "Discover how electric bikes can save you money on daily commutes, cutting travel costs by up to 75%.",
  },
  {
    title: "Health and Wellness",
    description: "Experience improved physical health with electric biking, which encourages an active lifestyle and reduces stress.",
  },
  {
    title: "Smart Mobility Options",
    description: "Explore innovative bike-sharing programs that make electric bikes accessible and convenient for everyone.",
  },
  {
    title: "Community Engagement",
    description: "Join local initiatives promoting e-bike usage, helping to decrease traffic congestion and improve air quality.",
  },
  {
    title: "Future of Urban Transport",
    description: "Learn how integrating electric bikes into city transport systems can lead to a sustainable urban future.",
  },
];

export default function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="flex w-full max-w-4xl m-auto mt-6 my-10 lg:my-20"
    >
      <CarouselContent>
        {cardData.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="bg-blue-100 dark:bg-blue-900 "> {/* Background for light/dark modes */}
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3> {/* Title color for light/dark modes */}
                  <p className="text-center text-gray-700 dark:text-gray-300 mb-4">{item.description}</p> {/* Description color for light/dark modes */}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
