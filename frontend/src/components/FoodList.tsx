import React, { useState, useEffect } from "react";
import FoodItem from "./FoodItem";
import { useAuthContext } from "@/context/AuthContext";
import { FaSpinner } from "react-icons/fa";

interface Food {
  _id: string;
  foodName: string;
  description: string;
  quantity: string;
  location:string
  foodImage: string;
  sharedBy: string;
}

const FoodList: React.FC = () => {
  const { authUser } = useAuthContext() || {};
  const [loading, setLoading] = useState(false);
  console.log(authUser.token);
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
          throw new Error(
            `Failed to retrieve food items: ${response.statusText}`
          );
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Unexpected response type: " + contentType);
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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Available Food</h2>
        {loading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {foods ? (
              foods.map(
                (food, index) => (
                  console.log(foods),
                  (<FoodItem key={`${food._id}-${index}`} food={food} />)
                )
              )
            ) : (
              <p>You dont have any food items yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FoodList;
