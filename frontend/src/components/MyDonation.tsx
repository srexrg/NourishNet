import React from "react";
import { Card, CardContent } from "./ui/card";

interface Food {
  _id: string;
  foodName: string;
  description: string;
  quantity: string;
  foodImage: string;
  sharedBy: string;
}

const MyDonation: React.FC<Props> = ({ food }: Props) => {

  const { foodName, description, quantity, foodImage, sharedBy } = food;

  return (
    <div className="bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-lg overflow-hidden">
      <Card className="bg-gray-200 dark:bg-gray-800">
        <CardContent>
          <img
            alt="Food Item"
            className="w-full h-48 object-cover object-center"
            src={foodImage}
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">
              {foodName}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Quantity: <span className="font-bold">{quantity}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Description: <span className="font-bold">{description}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Shared by: <span className="font-bold">{sharedBy}</span> 
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export interface Props {
  food: Food;
}

export default MyDonation;
