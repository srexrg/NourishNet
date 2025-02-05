import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import toast from "react-hot-toast";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { useAuthContext } from "@/context/AuthContext";

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
  const { authUser } = useAuthContext() || {};
  const [loading, setLoading] = useState(false);

  const { foodName, description, quantity, foodImage, sharedBy, status, _id } =
    request;

  const handleDeleteRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/deleteRequest/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete request");
      }
      toast.success("Request deleted successfully!");
      reloadRequests();
    } catch (error) {
      console.error("Error deleting food request:", error);
      toast.error("Error deleting request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            alt={foodName}
            className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
            src={foodImage}
          />
          <Badge 
            className={`absolute top-2 right-2 ${
              status === 'pending' ? 'bg-yellow-500' :
              status === 'accepted' ? 'bg-green-500' :
              'bg-red-500'
            }`}
          >
            {status}
          </Badge>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {foodName}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Quantity: {quantity}
            </p>
            <p className="text-sm text-muted-foreground">
              Shared by: {sharedBy}
            </p>
          </div>

          <Button
            variant="destructive"
            className="w-full"
            onClick={handleDeleteRequest}
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <>
                <FaTrash className="mr-2" />
                Delete Request
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export interface Props {
  request: Request;
  reloadRequests: () => void;
}

export default RequestCard;
