import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const JoinUs = () => {

  return (
    <section id="join-us">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32 text-center">
        <h3 className="text-4xl md:text-5xl font-bold">
          Join Us{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Now!
          </span>
        </h3>
        <p className="text-xl text-muted-foreground mt-4 mb-8">
          Be part of our community and make a difference.
        </p>
        <Button>
        <Link to="/signin">Join Us</Link>

        </Button>

        
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
