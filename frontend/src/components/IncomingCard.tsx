import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import toast from "react-hot-toast";
import { FaSpinner, FaCheck, FaTimes } from "react-icons/fa";
import { useAuthContext } from "@/context/AuthContext";

interface Request {
  _id: string;
  foodName: string;
  description: string;
  quantity: string;
  foodImage: string;
  sharedBy: string;
  status: string;
  requesterId: {
    username: string;
  };
}

const IncomingCard: React.FC<Props> = ({ request, reloadRequests }: Props) => {
  const { authUser } = useAuthContext() || {};
  const [loading, setLoading] = useState(false);
  const { foodName, description, quantity, foodImage, status, _id } = request;

  const handleAcceptRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/accept/${_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to Accept request");
      }
      toast.success("Request Accepted successfully!");
      reloadRequests();
    } catch (error) {
      console.error("Error Accepting food request:", error);
      toast.error("Error Accepting food Request");
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/decline/${_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to decline request");
      }
      toast.success("Request declined successfully!");
      reloadRequests();
    } catch (error) {
      console.error("Error declining food request:", error);
      toast.error("Error declining request");
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
              Requested by: {request.requesterId.username}
            </p>
          </div>

          {status === 'pending' && (
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={handleAcceptRequest}
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Accept
                  </>
                )}
              </Button>
              <Button
                className="flex-1"
                variant="destructive"
                onClick={handleDeclineRequest}
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaTimes className="mr-2" />
                    Decline
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export interface Props {
  request: Request;
  reloadRequests: () => void;
}

export default IncomingCard;
