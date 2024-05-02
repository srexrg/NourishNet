import { useState } from "react";
import toast from "react-hot-toast";

const useAddFood = () => {
  const [loading, setLoading] = useState(false);

  const addFood = async ({
    foodName,
    description,
    quantity,
    location,
    foodImage,
  }: {
    foodName: string;
    description: string;
    quantity: number;
    location: string;
    foodImage:string | Blob
  }) => {
    const success = validateInput({
      foodName,
      quantity,
      location,
    });

    if (!success) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("foodName",foodName)
      formData.append("description",description)
      formData.append("quantity",quantity.toString())
      formData.append("location",location)
      formData.append("foodImage",foodImage)

      const res = await fetch("https://nourish-net-backend.vercel.app/api/food/donate-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodName,
          description,
          quantity,
          location,
        })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Food added successfully!");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, addFood };
};

function validateInput({
  foodName,
  quantity,
  location,
}: {
  foodName: string;
  quantity: number;
  location: string;
}) {
  if (!foodName || !quantity || !location) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}

export default useAddFood;
