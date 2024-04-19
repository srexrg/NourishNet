import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Discover",
    description:
      "Explore a diverse range of recipes, cooking tips, and food-related content shared by members of the community. From traditional dishes to innovative creations, there's something for everyone to discover and enjoy.",
  },
  {
    icon: <MapIcon />,
    title: "Connect",
    description:
      "Connect with fellow food enthusiasts, local producers, and chefs in your area. Share your culinary experiences, exchange ideas, and build meaningful relationships with like-minded individuals who share your passion for food.",
  },
  {
    icon: <PlaneIcon />,
    title: "Contribute",
    description:
      "Contribute to the community by sharing your own recipes, cooking hacks, and food experiences. Your contributions help inspire others and enrich the collective knowledge of our food community.",
  },
  {
    icon: <GiftIcon />,
    title: "Support",
    description:
      "Provide support and encouragement to your fellow community members. Whether it's offering advice, lending a listening ear, or celebrating each other's achievements, your support helps strengthen the bonds within our community.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-gray-600">
        Get started with FoodNet and discover how our platform works in four simple steps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
