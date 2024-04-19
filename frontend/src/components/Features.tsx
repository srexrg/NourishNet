import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image1 from "../assets/community-driven.jpeg";
import image2 from "../assets/varied-food.jpeg";
import image3 from "../assets/healthy-eating.jpeg";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Community-driven Sharing",
    description:
      "Join a vibrant community of food enthusiasts and neighbors who share surplus food items to reduce waste and foster connections.",
    image: image1,
  },
  {
    title: "Varied Food Options",
    description:
      "Explore a diverse range of food items including fresh produce, homemade meals, baked goods, and more, shared by members of the community.",
    image: image2,
  },
  {
    title: "Healthy Eating Resources",
    description:
      "Access resources and information on healthy eating habits, nutrition tips, and recipes shared by nutrition experts and fellow community members.",
    image: image3,
  },
];

const featureList: string[] = [
  "Community-driven",
  "Diverse Food Options",
  "Healthy Eating Resources",
  "Local Connections",
  "Food Waste Reduction",
  "Interactive Platform",
  "User Reviews",
  "NGO Support",
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Explore{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Key Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="Feature illustration"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
