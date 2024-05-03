import React, { useState, useEffect } from "react";
import FoodItem from "./FoodItem";
import { useAuthContext } from "@/context/AuthContext";

interface Food {
  _id: string;
  foodName: string;
  description: string;
  quantity: string;
  foodImage: string;
  sharedBy: string;
}

const FoodList: React.FC = () => {
  const {authUser} = useAuthContext() || {}
  console.log(authUser.token)
  const [foods, setFoods] = useState<Food[] | null>(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/food/',{
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
          
        });
  
        if (!response.ok) {
          throw new Error(`Failed to retrieve food items: ${response.statusText}`);
        }
  
        const data = await response.json();
        setFoods(data);
      } catch (err) {
        console.error('Error fetching food items:', err);
        setFoods([]); 
      } 
    };
  
    fetchFood();
  }, [authUser]);
  
  

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Available Food</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
             {foods ? (
            foods.map((food, index) => (
              console.log(foods),
              <FoodItem key={`${food._id}-${index}`} food={food} />
            ))):(
              <p>You dont have any food items yet.</p>
            )}
          </div>
      </div>
    </section>
  );
};

export default FoodList;
