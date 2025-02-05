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
  CardFooter,
} from "@/components/ui/card";
import {
  MdCloudUpload,
  MdFoodBank,
  MdDescription,
  MdLocationOn,
  MdNumbers,
  MdHome,
  MdImage,
} from "react-icons/md";

import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { FaSpinner } from "react-icons/fa";

export default function AddFood() {
  const { authUser } = useAuthContext() || {};
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [input, setInput] = useState({
    foodName: "",
    description: "",
    quantity: "",
    location: "",
    foodImage: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
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
      if (imageData.url) {
        return imageData.url;
      } else {
        throw new Error("URL not found in Cloudinary response");
      }
    } catch (error) {
      toast.error((error as Error).message);
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, foodImage: file }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

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
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Food added successfully!");
      navigate("/home");
    } catch (e) {
      toast.error((e as Error).message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Share a Meal</h1>
          <Button variant="outline" size="icon" asChild>
            <Link to="/home">
              <MdHome className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Donation Details</CardTitle>
            <CardDescription>
              Fill in the details about the food you'd like to share
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="foodName">Food Name</Label>
                  <div className="relative">
                    <MdFoodBank className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="foodName"
                      name="foodName"
                      placeholder="Enter food name"
                      className="pl-10"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <div className="relative">
                    <MdDescription className="absolute left-3 top-3 text-muted-foreground" />
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the food item"
                      className="pl-10 min-h-[100px]"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="relative">
                    <MdNumbers className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="quantity"
                      name="quantity"
                      placeholder="Enter quantity"
                      className="pl-10"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MdLocationOn className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="Enter location"
                      className="pl-10"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foodImage">Food Image</Label>
                  <div className="relative">
                    <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        id="foodImage"
                        accept="image/*"
                        onChange={handleImage}
                        className="hidden"
                      />
                      <label
                        htmlFor="foodImage"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ) : (
                          <>
                            <MdImage className="w-10 h-10 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Click to upload image
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                  Adding Food...
                </>
              ) : (
                <>
                  <MdCloudUpload className="mr-2 h-4 w-4" />
                  Share Food
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
