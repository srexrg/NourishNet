import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import foodsharing from "../assets/food-sharing.jpeg";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Community Support",
    description:
      "Join a supportive community dedicated to providing food assistance to those in need. Contribute by offering food donations, volunteering your time, or sharing resources to help alleviate hunger in your local community.",
    icon: <MagnifierIcon />,
  },
  {
    title: "Food Donations",
    description:
      "Donate excess food from your pantry, garden, or local events to help feed those facing food insecurity. Your contributions can make a significant difference in providing nutritious meals to individuals and families in need.",
    icon: <WalletIcon />,
  },
  {
    title: "Volunteer Opportunities",
    description:
      "Get involved in volunteer programs and initiatives aimed at distributing food to underserved communities. Whether it's packing food parcels, organizing community events, or delivering meals, there are plenty of ways to lend a helping hand.",
    icon: <ChartIcon />,
  },
];

export const Services = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Food Sharing{" "}
            </span>
            Services
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8">
            Join us in our mission to combat food insecurity and hunger. Explore the services we offer to support those in need of access to nutritious meals.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <img
            src={foodsharing}
            className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
            alt="About services"
          />
        </div>
      </div>
    </section>
  );
};
