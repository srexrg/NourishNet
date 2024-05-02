import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { FaSpinner } from 'react-icons/fa';

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
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [AcceptbuttonText, setAcceptButtonText] = useState("Accept")
  const [DeclinebuttonText, setDeclineButtonText] = useState("Decline")
  const { foodName, description, quantity, foodImage, status, _id } = request;

  const handleAcceptRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://nourishnet-vt0k.onrender.com/api/food/accept/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to Accept request");
      }
      toast.success("Request Accepted successfully!");
      reloadRequests();
      setIsHidden(true)
      setAcceptButtonText("Accepted")
    } catch (error) {
      console.error("Error Accepting food request:", error);
      toast.error("Error Accepting food Request");
    } finally {
      setLoading(false);
    }
  };

  const DeclineRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://nourishnet-vt0k.onrender.com/api/food/decline/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to Accept request");
      }
      toast.success("Request Declined successfully!");
      reloadRequests();
      setIsHidden(true)
      setDeclineButtonText("Declined")
    } catch (error) {
      console.error("Error Declining food request:", error);
      toast.error("Error Declining food");
    } finally {
      setLoading(false);
    }
  };

  if(isHidden){
    return null
  }

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
              Requested by:{" "}
              <span className="font-bold">{request.requesterId.username}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Status: <span className="font-bold">{status}</span>
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleAcceptRequest} disabled={loading}>
                {loading ? <FaSpinner className="animate-spin" /> : AcceptbuttonText}
              </Button>
              <Button onClick={DeclineRequest} disabled={loading}>
                {loading ? <FaSpinner className="animate-spin" /> : DeclinebuttonText}
              </Button>
            </div>
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

export default IncomingCard;
