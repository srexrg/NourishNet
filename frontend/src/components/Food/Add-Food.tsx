/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/context/AuthContext";

export default function AddFood() {
  const {authUser} = useAuthContext()||{}
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    foodName: "",
    description: "",
    quantity: "",
    location: "",
    foodImage: null,
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleImage = (e: { target: { files: any[] } }) => {
    const file = e.target.files?.[0];
    setInput({ ...input, foodImage: file || null });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      !input.foodName ||
      !input.description ||
      !input.quantity ||
      !input.location ||
      !input.foodImage
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("foodName", input.foodName);
    formData.append("description", input.description);
    formData.append("quantity", input.quantity);
    formData.append("location", input.location);
    if (input.foodImage) {
      formData.append("foodImage", input.foodImage);
    } else {
      formData.append("foodImage", "");
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/food/donate-food", {
        method: "POST",
        body: formData,
          headers:{
            Authorization: `Bearer ${authUser.token}`,}
      });

      const data = await res.json();
      console.log(data)
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Food added successfully!");
      navigate("/home");
    } catch (e) {
      toast.error((e as Error).message);
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#111827] text-white min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-8">
        <div className="space-y-2 text-center">
          <div>
            <h1 className="text-5xl font-bold mb-4">Add Food</h1>
            <p className="text-xl mb-8">
              Join us in spreading kindness through sharing meals with your
              community.
            </p>
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="grid gap-6">
                <div>
                  <Label
                    className="block text-sm font-medium mb-1"
                    placeholder="name"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="foodName"
                    onChange={handleInputChange}
                    placeholder="Enter food item name"
                    required
                  />
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
                    name="description"
                    onChange={handleInputChange}
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
                  <Input
                    id="location"
                    name="location"
                    onChange={handleInputChange}
                    placeholder="Enter Location"
                    type="text"
                    required
                  />
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
                    name="quantity"
                    onChange={handleInputChange}
                    placeholder="Enter Quantity"
                    type="number"
                    required
                  />
                </div>
                <div>
                  <Label
                    className="block text-sm font-medium mb-1"
                    htmlFor="photo"
                  >
                    Photo
                  </Label>
                  <Input
                    id="photo"
                    name="foodImage"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        const filesArray = Array.from(e.target.files);
                        handleImage({ target: { files: filesArray } });
                      }
                    }}
                    type="file"
                    required
                  />
                </div>
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner">Sharing</span>
                ) : (
                  "Share Food"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
