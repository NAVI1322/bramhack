import { Gamepad, Star, UserCheck, Users, Award, Lock } from "lucide-react";
import { BorderBeamDemo } from "@/components/majorComponents/BorderBeam";

import user1 from "../assets/images/profile-pictures/user1.jpg";
import user2 from "../assets/images/profile-pictures/user2.jpg";
import user3 from "../assets/images/profile-pictures/user3.jpg";
import user4 from "../assets/images/profile-pictures/user4.jpg";
import user5 from "../assets/images/profile-pictures/user5.jpg";
import user6 from "../assets/images/profile-pictures/user6.jpg";
import illustration1 from "../assets/images/timeline-illustrations/1.jpeg";
import illustration2 from "../assets/images/timeline-illustrations/2.jpeg";
import illustration3 from "../assets/images/timeline-illustrations/3.jpeg";
import illustration4 from "../assets/images/timeline-illustrations/4.jpeg";
import illustration5 from "../assets/images/timeline-illustrations/5.jpeg";
import illustration6 from "../assets/images/timeline-illustrations/6.jpeg";
import illustration7 from "../assets/images/timeline-illustrations/6.jpeg";
export const projects = [
  {
    title: "Eco-Friendly Commuting",
    description: "Switch to electric bikes for a sustainable alternative to crowded buses, reducing carbon emissions by up to 50% per trip.",
    link: "https://www.ebi.bike/eco-friendly-commuting"
  },
  {
    title: "Cost-Effective Travel",
    description: "Save up to 75% on commuting costs with electric bikes compared to public transport fares, especially for short distances.",
    link: "https://www.ebi.bike/cost-effective-travel"
  },
  {
    title: "Health Benefits",
    description: "Enjoy the health benefits of cycling while contributing to a cleaner environment, with studies showing a 30% increase in physical activity among e-bike users.",
    link: "https://www.ebi.bike/health-benefits"
  },
  {
    title: "Smart Bike Sharing",
    description: "Utilize our smart bike-sharing program to access electric bikes conveniently, reducing the need for personal vehicle use.",
    link: "https://www.ebi.bike/smart-bike-sharing"
  },
  {
    title: "Community Impact",
    description: "Join local initiatives promoting electric bike usage, which have led to a 20% decrease in urban traffic congestion.",
    link: "https://www.ebi.bike/community-impact"
  },
  {
    title: "Sustainable Urban Mobility",
    description: "Explore how integrating electric bikes into urban transport systems can lead to a more sustainable future for cities.",
    link: "https://www.ebi.bike/sustainable-urban-mobility"
  },
];
export const reviews = [
  {
    name: "Alex Green",
    username: "Eco Riders",
    body: "This app has changed my daily commute! I love the convenience and knowing I’m reducing my carbon footprint with every ride.",
    img: user1,
  },
  {
    name: "Lisa Ray",
    username: "Urban Commuters",
    body: "An efficient, eco-friendly solution for short trips around the city. The pay-per-mile model makes it so affordable!",
    img: user2,
  },
  {
    name: "Mark Robinson",
    username: "Green Wheels",
    body: "Finding a charging station is so easy! It’s amazing to have access to sustainable transport that fits my needs perfectly.",
    img: user3,
  },
  {
    name: "Rachel Kim",
    username: "Smart Commute",
    body: "The app’s tracking feature is a great reminder of my positive environmental impact. I highly recommend it for short commutes!",
    img: user4,
  },
  {
    name: "John Lewis",
    username: "Eco Fleet",
    body: "This app makes it easy to find a bike, ride, and pay only for the distance I traveled. It’s the future of urban commuting!",
    img: user5,
  },
  {
    name: "Sophia Chen",
    username: "Green City Co.",
    body: "The flexibility and ease of use make this the best choice for eco-conscious urban travelers. Absolutely love it!",
    img: user6,
  },
];

export const sections = [
  
  { left: '', right: '' },
  { left: 'Our', right: 'Partners' },
  { left: 'How it', right: 'Works?' },
  { left: 'Employer', right: 'Services' },
  { left: 'Game', right: 'Features' },
];

export const navItems = [
  { label: "How it Works", href: "#" },
  { label: "Achievements", href: "#" },
  { label: "Pricing Plans", href: "#" },
  { label: "Community", href: "#" },
];

type TimelineEntry = {
  title: string;
  content: React.ReactNode;
};
export const timelineData: TimelineEntry[] = [
  {
    title: "Create Your Profile",
    content: (
      <p className=''>
        <div className='max-w-sm m-auto'>
          Start by creating a profile on our platform. Add your preferences, commute distance, and payment details to personalize your electric bike experience. This helps us tailor the best options and services just for you.
        </div>
        <div className='my-10'>
          <BorderBeamDemo image={illustration1} />
        </div>
      </p>
    ),
  },
  {
    title: "Find Nearby Charging Stations",
    content: (
      <p className=''>
        <div className='max-w-sm m-auto'>
          Use our app to locate convenient charging stations near you. Our map displays all nearby charging points so that you can keep your bike powered up wherever you go. No more range anxiety—just enjoy the ride!
        </div>
        <div className='my-10'>
          <BorderBeamDemo image={illustration2} />
        </div>
      </p>
    ),
  },
  {
    title: "Flexible and Affordable Rides",
    content: (
      <p className=''>
        <div className='max-w-sm m-auto'>
          Pay only for the distance you travel! Our pay-per-mile model makes it cost-effective and simple to use our electric bikes without any hidden fees. It’s an affordable solution designed to suit short commutes.
        </div>
        <div className='my-10'>
          <BorderBeamDemo image={illustration3} />
        </div>
      </p>
    ),
  },
  {
    title: "Real-Time Bike Availability",
    content: (
      <p className=''>
        <div className='max-w-sm m-auto'>
          Instantly locate available bikes near you through the app. We connect you with the closest electric bike ready for use, so you can begin your journey quickly and conveniently without any hassle.
        </div>
        <div className='my-10'>
          <BorderBeamDemo image={illustration4} />
        </div>
      </p>
    ),
  },
  {
    title: "Track Your Environmental Impact",
    content: (
      <p className=''>
        <div className='max-w-sm m-auto'>
          Each ride on our electric bikes helps reduce your carbon footprint. Track your environmental impact in the app and see how much CO₂ you've saved by choosing a green commuting option!
        </div>
        <div className='my-10'>
          <BorderBeamDemo image={illustration5} />
        </div>
      </p>
    ),
  },
  {
    title: "End Your Ride and Lock the Bike",
    content: (
      <p className=''>
        <div className='max-w-sm m-auto'>
          Once you reach your destination, simply park and lock the bike in a designated area. It’s that easy! Our app will calculate your total fare based on the distance traveled, so you’re only paying for what you use.
        </div>
        <div className='my-10'>
          <BorderBeamDemo image={illustration6} />
        </div>
      </p>
    ),
  },
  {
    title: "Provide Feedback to Improve the Service",
    content: (
      <p className=''>
        <div className='max-w-sm m-auto'>
          Your experience matters! After each ride, you can leave feedback to help us improve our service. Whether it’s about bike performance, charging stations, or app usability, we’re here to listen and grow together.
        </div>
        <div className='my-10'>
          <BorderBeamDemo image={illustration7} />
        </div>
      </p>
    ),
  },
];


export const testimonials = [
  {
    user: "Alex Green",
    company: "Eco Riders",
    image: user1,
    text: "This app has changed my daily commute! I love the convenience and knowing I’m reducing my carbon footprint with every ride.",
  },
  {
    user: "Lisa Ray",
    company: "Urban Commuters",
    image: user2,
    text: "An efficient, eco-friendly solution for short trips around the city. The pay-per-mile model makes it so affordable!",
  },
  {
    user: "Mark Robinson",
    company: "Green Wheels",
    image: user3,
    text: "Finding a charging station is so easy! It’s amazing to have access to sustainable transport that fits my needs perfectly.",
  },
  {
    user: "Rachel Kim",
    company: "Smart Commute",
    image: user4,
    text: "The app’s tracking feature is a great reminder of my positive environmental impact. I highly recommend it for short commutes!",
  },
  {
    user: "John Lewis",
    company: "Eco Fleet",
    image: user5,
    text: "This app makes it easy to find a bike, ride, and pay only for the distance I traveled. It’s the future of urban commuting!",
  },
  {
    user: "Sophia Chen",
    company: "Green City Co.",
    image: user6,
    text: "The flexibility and ease of use make this the best choice for eco-conscious urban travelers. Absolutely love it!",
  },
];

export const features = [
  {
    icon: <Gamepad />,
    text: "Easy Profile Setup",
    description: "Get started by creating a profile, setting up preferences, and accessing bike and charging locations easily.",
  },
  {
    icon: <Star />,
    text: "Pay-per-Mile System",
    description: "Only pay for the distance you travel, making each ride affordable and tailored to your budget.",
  },
  {
    icon: <Users />,
    text: "Find Nearby Bikes and Stations",
    description: "Use our app to locate available bikes and charging stations near you, ensuring a smooth and uninterrupted ride.",
  },
  {
    icon: <UserCheck />,
    text: "Track Your Carbon Footprint",
    description: "See how each ride reduces emissions and contributes to a cleaner environment, right in your app.",
  },
  {
    icon: <Lock />,
    text: "Secure Rides and Easy Returns",
    description: "Lock your bike securely at the end of each ride and only pay for the distance you've traveled.",
  },
  {
    icon: <Award />,
    text: "Real-Time Analytics",
    description: "Access data on your travel, distance covered, and environmental impact to enhance your commuting experience.",
  },
];

export const checklistItems = [
  {
    title: "Locate Nearby Charging Stations",
    description: "Use the app to find charging stations for your bike, so you’re never far from a convenient spot to power up.",
  },
  {
    title: "Pay Only for the Distance You Travel",
    description: "Enjoy flexibility with our pay-per-mile system, giving you control over how much you spend based on your usage.",
  },
  {
    title: "Monitor Environmental Impact",
    description: "See how much CO₂ you've saved by choosing sustainable commuting options, making every ride count.",
  },
  {
    title: "Share Your Commute Stats",
    description: "Share your achievements and environmental impact with friends to inspire a more eco-friendly community.",
  },
];


export const pricingOptions = [
  {
    title: "Pay-Per-Mile",
    price: "$0.10/mile",
    features: [
      "Pay only for the distance you travel",
      "Access to all bikes and charging stations",
      "Basic usage tracking and analytics",
      "No monthly commitment, pay as you go",
    ],
  },
  {
    title: "Pro",
    price: "$30/month",
    features: [
      "Unlimited rides up to 150 miles per month",
      "Discounted rate of $0.08 per mile after 150 miles",
      "Priority access to bikes and stations",
      "Environmental impact tracking and insights",
    ],
  },
  {
    title: "Lifetime",
    price: "$500",
    features: [
      "Unlimited rides for life",
      "Access to exclusive bikes and premium stations",
      "Full analytics and environmental tracking",
      "One-time payment with no additional costs",
    ],
  },
];


export const resourcesLinks = [
  { href: "#", text: "Charging Station Locator" },
  { href: "#", text: "User Guide" },
  { href: "#", text: "Eco-Friendly Commuting Tips" },
];

export const platformLinks = [
  { href: "#", text: "App Features Overview" },
  { href: "#", text: "How It Works" },
  { href: "#", text: "Environmental Impact" },
];

export const communityLinks = [
  { href: "#", text: "Rider Stories" },
  { href: "#", text: "Community Meetups" },
  { href: "#", text: "Sustainability Webinars" },
];
