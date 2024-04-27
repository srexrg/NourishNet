import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface Food {
  id: number;
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
  return (
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
            <p className="text-gray-600 dark:text-gray-400 mb-2 leading-6">
              {food.description}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Quantity: <span className="font-bold">{food.quantity}</span>
            </p>
            {food.sharedBy ? (
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Shared by:{" "}
                <span className="font-bold">
                  {food.sharedBy.charAt(0).toUpperCase() +
                    food.sharedBy.slice(1)}
                </span>
              </p>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Shared by: <span className="font-bold">Admin</span>
              </p>
            )}
            <div className="flex justify-center mt-4">
              <Button>Claim</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodItem;
