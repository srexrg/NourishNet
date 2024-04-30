

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface Request {
  _id: string;
  foodName: string;
  description: string;
  quantity: string;
  foodImage: string;
  sharedBy: string;
  status: string;
}

const RequestCard: React.FC<Props> = ({ request, reloadRequests }: Props) => { 
  const [loading, setLoading] = useState(false);

  const { foodName, description, quantity, foodImage, sharedBy, status, _id } =
    request;

  const handleDeleteRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/food/deleteRequest/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete request");
      }
      toast.success("Food Deleted successfully!");
      reloadRequests(); 
    } catch (error) {
      console.error("Error Deleting food request:", error);
      toast.error("Error deleting food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-gray-900 rounded-lg overflow-hidden">
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
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Status: <span className="font-bold">{status}</span>
            </p>
            <Button onClick={handleDeleteRequest} disabled={loading}> 
              {loading ? "Deleting" : "Delete Request"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export interface Props {
  request: Request;
  reloadRequests: () => void; 
}

export default RequestCard;
