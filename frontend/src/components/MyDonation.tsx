import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

interface Food {
  _id: string;
  foodName: string;
  description: string;
  quantity: string;
  foodImage: string;
  sharedBy: string;
}

const MyDonation: React.FC<Props> = ({ food,reloadRequests }: Props) => {

  const { _id,foodName, description, quantity, foodImage, sharedBy } = food;
  const {authUser} =useAuthContext()||{}
  const [loading, setLoading] = useState(false);

  const handleDeleteDonation = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/food/delete/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to delete request");
      }
      toast.success("Food Deleted successfully!");
      reloadRequests(); 
    } catch (error) {
      console.log("Error Deleting food request:", error);
      toast.error("Error deleting food");
    } finally {
      setLoading(false);
    }
  };

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
            <Button onClick={handleDeleteDonation} disabled={loading}> 
              {loading ? "Deleting" : "Delete Request"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export interface Props {
  food: Food;
  reloadRequests: () => void; 
}

export default MyDonation;
