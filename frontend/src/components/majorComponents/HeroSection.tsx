// import video1 from "../../assets/video1.mp4";
// import video2 from "../../assets/video2.mp4";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";


const HeroSection = () => {


  const router = useNavigate()

  return (
<div className="relative flex flex-col items-center mt-6 lg:mt-20">
  <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
    Revolutionizing Urban Travel{" "}
    <span className="bg-gradient-to-r from-green-500 to-blue-800 text-transparent bg-clip-text">
      with Sustainable Electric Bikes
    </span>
  </h1>
  <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
    Our app makes short-distance travel eco-friendly and convenient. Locate nearby electric bikes, pay only for the miles you travel, and track your reduced carbon footprint. With flexible options and charging stations throughout the city, sustainable travel has never been easier!
  </p>

  <div className="flex flex-col md:flex-row justify-center my-10 relative gap-5 md:gap-4 items-center">
    <Button variant={"myButton"} aria-label="Rider"  onClick={()=>router('/dashboard')}>Find a Bike</Button>
    <Button variant={"myButton"} aria-label="Environmentalist">Learn More</Button>
  </div>
</div>
  );
};

export default HeroSection;
