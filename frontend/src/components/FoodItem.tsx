import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import toast from "react-hot-toast";

interface Food {
  _id: string;
  foodName: string;
  description: string;
  quantity: string;
  foodImage: string;
  sharedBy: string;
}

interface Props {
  food: Food;
}

const FoodItem: React.FunctionComponent<Props> = ({ food }) => {
  const [showPopup, setShowPopup] = useState(false);
  console.log(food._id)

  const handleRequestClick = async () => {
    try {
      const response = await fetch(`/api/food/request/${food._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      toast.success("Food requested successfully!");
      console.log(data); 
    } catch (error) {
      console.error("Error sending food request:", error);
      toast.error("Error requesting food");
    }
  };

  const handleViewClick = async () => {
    try {
      const response = await fetch(`/api/food/${food._id}`);
      const data = await response.json();
      setShowPopup(true);
      console.log(data); 
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-lg overflow-hidden">
        <Card className="bg-gray-200 dark:bg-gray-800">
          <CardContent>
            <img
              alt="Food Item"
              className="w-full h-48 object-cover object-center"
              src={food.foodImage}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">
                {food.foodName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Quantity: <span className="font-bold">{food.quantity}</span>
              </p>
              <div className="flex justify-center mt-4">
                <Button onClick={handleViewClick}>View</Button>
                <Button onClick={handleRequestClick} className="ml-4">
                  Request
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-900 w-full max-w-md p-6 rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-300 mb-4">
                Food Details
              </h2>
              <hr className="border-gray-300 mb-4" />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Name:
              </p>
              <p className="text-gray-800 dark:text-gray-300">
                {food.foodName}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Description:
              </p>
              <p className="text-gray-800 dark:text-gray-300">
                {food.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Quantity:
              </p>
              <p className="text-gray-800 dark:text-gray-300">
                {food.quantity}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Shared By:
              </p>
              <p className="text-gray-800 dark:text-gray-300">
                {food.sharedBy
                  ? food.sharedBy.charAt(0).toUpperCase() +
                    food.sharedBy.slice(1)
                  : "Admin"}
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <Button onClick={() => setShowPopup(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodItem;
