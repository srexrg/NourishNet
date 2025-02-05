import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { FaSpinner, FaTrash } from "react-icons/fa";

interface Food {
  _id: string;
  foodName: string;
  description: string;
  quantity: string;
  foodImage: string;
  sharedBy: string;
  // location: string;
}

const MyDonation: React.FC<Props> = ({ food, reloadRequests }: Props) => {
  const { _id, foodName, description, quantity, foodImage, sharedBy } = food;
  const { authUser } = useAuthContext() || {};
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleDeleteDonation = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/delete/${_id}`,
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
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <img
              alt={foodName}
              className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
              src={foodImage}
            />
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
                {sharedBy}
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() => setShowDetails(true)}
              >
                View Details
              </Button>
              <Button
                variant="destructive"
                className="w-1/2"
                onClick={handleDeleteDonation}
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <>
                    <FaTrash className="mr-2" />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Food Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
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
                src={foodImage}
                alt={foodName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Name
                  </h4>
                  <p className="text-sm">{foodName}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Quantity
                  </h4>
                  <p className="text-sm">{quantity}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Location
                  </h4>
                  {/* <p className="text-sm">{location}</p> */}
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Shared By
                  </h4>
                  <p className="text-sm">{sharedBy}</p>
                </div>
                <div className="col-span-2 space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Description
                  </h4>
                  <p className="text-sm">{description}</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end">
              <Button variant="outline" onClick={() => setShowDetails(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export interface Props {
  food: Food;
  reloadRequests: () => void;
}

export default MyDonation;
