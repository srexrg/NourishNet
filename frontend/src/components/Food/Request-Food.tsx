import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";

export default function RequestFood() {
  return (
    <section className="bg-[#111827] text-white min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-8">
        <div className="space-y-2 text-center">
          <div>
            <h1 className="text-5xl font-bold mb-4">Request Food</h1>
            <p className="text-xl mb-8">
              Join us in spreading kindness through sharing meals with your
              community.
            </p>
            <form className="space-y-6">
              <div>
                <Label
                  className="block text-sm font-medium mb-1"
                  placeholder="name"
                >
                  Name
                </Label>
                <Input id="name" placeholder="Enter food item name" required />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe the food item"
                  required
                />
              </div>
              <div>
                <Label
                  className="block text-sm font-medium mb-1"
                  htmlFor="location"
                >
                  Location
                </Label>
                <Input id="location" placeholder="Enter Location" type="text" />
              </div>
              <div>
                <Label
                  className="block text-sm font-medium mb-1"
                  htmlFor="quantity"
                >
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  placeholder="Enter Quantity"
                  type="number"
                />
              </div>
              <div>
                <Label
                  className="block text-sm font-medium mb-1"
                  htmlFor="photo"
                >
                  Photo
                </Label>
                <Input id="photo" type="file" />
              </div>
              <Button className="w-full" type="submit">
                Share Food
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
