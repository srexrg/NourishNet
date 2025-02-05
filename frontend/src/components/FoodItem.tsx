/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { FaSpinner } from "react-icons/fa";

interface Food {
  _id: string;
  foodName: string;
  description: string;
  quantity: string;
  location: string;
  foodImage: string;
  sharedBy: string;
}

interface Props {
  food: Food;
}

const FoodItem: React.FunctionComponent<Props> = ({ food }) => {
  const { authUser } = useAuthContext() || {};
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequestClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/request/${food._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      console.log(response)
      toast.success("Food requested successfully!");
    } catch (error) {
      console.error("Error sending food request:", error);
      toast.error("Error requesting food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <img
              alt={food.foodName}
              className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
              src={food.foodImage}
            />
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {food.foodName}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {food.description}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {food.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {food.sharedBy
                  ? food.sharedBy.charAt(0).toUpperCase() + food.sharedBy.slice(1)
                  : "Admin"}
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() => setShowPopup(true)}
              >
                View Details
              </Button>
              <Button
                className="w-1/2"
                onClick={handleRequestClick}
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  "Request"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Food Details</h2>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">Name</h4>
                  <p className="text-sm">{food.foodName}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">Quantity</h4>
                  <p className="text-sm">{food.quantity}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">Location</h4>
                  <p className="text-sm">{food.location}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">Shared By</h4>
                  <p className="text-sm">
                    {food.sharedBy
                      ? food.sharedBy.charAt(0).toUpperCase() + food.sharedBy.slice(1)
                      : "Admin"}
                  </p>
                </div>
                <div className="col-span-2 space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">Description</h4>
                  <p className="text-sm">{food.description}</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowPopup(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodItem;
