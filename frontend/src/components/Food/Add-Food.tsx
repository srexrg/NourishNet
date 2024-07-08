/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  MdCloudUpload,
  MdFoodBank,
  MdDescription,
  MdLocationOn,
  MdNumbers,
} from "react-icons/md";

import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/context/AuthContext";
import { FaSpinner } from "react-icons/fa";

export default function AddFood() {
  const { authUser } = useAuthContext() || {};
  const navigate = useNavigate();

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

    if (loading) {
      return;
    }

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

    setLoading(true);
    try {
      const ImageUrl = await handleImageUpload();
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/donate-food`,
        {
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
        }
      );

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
    <section
      className={`bg-[#111827] min-h-screen flex flex-col items-center justify-center p-4`}
    >
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Share a Meal
          </CardTitle>
          <CardDescription className="text-center">
            Spread kindness through sharing meals with your community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <MdFoodBank className="absolute top-2.5 left-3 text-gray-500" />
                <Input
                  id="name"
                  name="foodName"
                  className="pl-10"
                  onChange={handleInputChange}
                  placeholder="Food item name"
                  required
                />
              </div>
              <div className="relative">
                <MdDescription className="absolute top-2.5 left-3 text-gray-500" />
                <Textarea
                  id="description"
                  name="description"
                  className="pl-10 min-h-[100px]"
                  onChange={handleInputChange}
                  placeholder="Describe the food item"
                  required
                />
              </div>
              <div className="relative">
                <MdLocationOn className="absolute top-2.5 left-3 text-gray-500" />
                <Input
                  id="location"
                  name="location"
                  className="pl-10"
                  onChange={handleInputChange}
                  placeholder="Enter Location"
                  type="text"
                  required
                />
              </div>
              <div className="relative">
                <MdNumbers className="absolute top-2.5 left-3 text-gray-500" />
                <Input
                  id="quantity"
                  name="quantity"
                  className="pl-10"
                  onChange={handleInputChange}
                  placeholder="Enter Quantity"
                  type="text"
                  required
                />
              </div>
              <div>
                <Label htmlFor="photo" className="block mb-2">
                  Photo
                </Label>
                <div className="relative">
                  <Input
                    id="photo"
                    name="foodImage"
                    className="hidden"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        const filesArray = Array.from(e.target.files);
                        handleImage({ target: { files: filesArray } });
                      }
                    }}
                    type="file"
                    required
                  />
                  <Button
                    type="button"
                    onClick={() => document.getElementById("photo")?.click()}
                    className="w-full flex items-center justify-center"
                  >
                    <MdCloudUpload className="mr-2" />
                    Upload Food Image
                  </Button>
                </div>
              </div>
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
              {loading ? "Sharing..." : "Share Food"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
