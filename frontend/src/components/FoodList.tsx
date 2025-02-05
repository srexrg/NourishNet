import React, { useState, useEffect } from "react";
import FoodItem from "./FoodItem";
import { useAuthContext } from "@/context/AuthContext";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Badge } from "./ui/badge";

interface Food {
  _id: string;
  foodName: string;
  description: string;
  quantity: string;
  location: string;
  foodImage: string;
  sharedBy: string;
}

const FoodList: React.FC = () => {
  const { authUser } = useAuthContext() || {};
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState<Food[] | null>(null);

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/food/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to retrieve food items: ${response.statusText}`);
        }

        const data = await response.json();
        setFoods(data);
      } catch (err) {
        console.error("Error fetching food items:", err);
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [authUser]);

  return (
    <section className="container py-24 sm:py-32 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl lg:text-4xl font-bold">
          Available{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Food Items
          </span>
        </h2>
        <p className="text-xl text-muted-foreground md:w-3/4 mx-auto">
          Browse through available food items shared by our community members
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {foods && foods.length > 0 ? (
            foods.map((food) => (
              <FoodItem key={food._id} food={food} />
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-muted-foreground text-lg">No food items available at the moment.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default FoodList;
