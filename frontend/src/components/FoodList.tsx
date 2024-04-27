import React, { useState, useEffect } from "react";
import FoodItem from "./FoodItem";

interface Food {
  id: number;
  foodName: string;
  description: string;
  quantity:string
  foodImage: string;
  sharedBy:string
}

const FoodList: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    fetch("/api/food/")
      .then((response) => response.json())
      .then((data) => setFoods(data))
      .catch((error) => console.error("Error fetching foods:", error));
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Available Food</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {foods.map((food) => (
            <FoodItem key={food.id} food={food} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodList;
