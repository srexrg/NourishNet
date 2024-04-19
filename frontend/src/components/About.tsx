import { Statistics } from "./Statistics";
import ngo from "../assets/ngo.jpeg";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={ngo}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Community
              </h2>
              <p className="text-xl text-gray-600 mt-4">
     Our community is dedicated to promoting healthy and
     sustainable food practices. We believe in the power of food to nourish our bodies, connect people, and create positive change in the world. Through collaborative efforts and shared knowledge, we strive to make a difference in our local communities and beyond. Join us in our mission to make good food accessible to all and build a healthier, more equitable food system for future generations.
        </p>

            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
