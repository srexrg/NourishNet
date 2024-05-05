/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/context/AuthContext";
import { useTheme } from "../theme-provider";
import { FaSpinner } from "react-icons/fa";

export default function AddFood() {
  const { authUser } = useAuthContext() || {};
  const navigate = useNavigate();
  const {theme} = useTheme()

  const styleClasses = theme === 'light' ? 'text-black bg-white dark:bg-gray-700' : '';

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

  const handleImageUpload = async () => {
    if (!input.foodImage) return;

    const data = new FormData();
    data.append("file", input.foodImage);
    data.append("upload_preset", "nourishNet");
    data.append("cloud_name", "diqlka3bc");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/diqlka3bc/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const imageData = await response.json();

      console.log(imageData.url);
      if (imageData.url) {
        return imageData.url;
      } else {
        throw new Error("URL not found in Cloudinary response");
      }
    } catch (error) {
      toast.error((error as Error).message);
      console.error("Error uploading image:", error);
    }
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

     const ImageUrl =  await handleImageUpload();

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/food/donate-food`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify({
          foodName: input.foodName,
          description: input.description,
          quantity: input.quantity,
          location: input.location,
          foodImage: ImageUrl,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Food added successfully!");
      navigate("/home");
    } catch (e) {
      toast.error((e as Error).message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`bg-[#111827] text-white min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'dark:border-b-slate-700 dark:bg-[#111827]' : ''}`}>
      <div className="max-w-4xl mx-auto p-8">
        <div className="space-y-2 text-center">
          <div>
            <h1 className="text-5xl font-bold mb-4">Add Food</h1>
            <p className="text-xl mb-8">
              Join us in spreading kindness through sharing meals with your
              community.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="foodName"
                    className={styleClasses}
                    onChange={handleInputChange}
                    placeholder="Enter food item name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    className={styleClasses}
                    name="description"
                    onChange={handleInputChange}
                    placeholder="Describe the food item"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    className={styleClasses}
                    onChange={handleInputChange}
                    placeholder="Enter Location"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    className={styleClasses}
                    onChange={handleInputChange}
                    placeholder="Enter Quantity"
                    type="text"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="photo">Photo</Label>
                  <Input
                    id="photo"
                    name="foodImage"
                    className={styleClasses}
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
                {loading ?  <FaSpinner className="animate-spin" /> : "Share Food"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
