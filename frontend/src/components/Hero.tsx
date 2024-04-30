import { Link } from "react-router-dom";
import { HeroCards } from "./HeroCards";
// import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              NourishNet
            </span>{" "}
            Community
          </h1>{" "}
          Platform
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Connect with your local food community, share delicious meals, and
          reduce food waste together.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Link className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none
             focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 
             h-10 px-4 py-2 w-full md:w-1/3" to="/signup">Join Now</Link>

          <a
            href="https://github.com/srexrg"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            GitHub Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
