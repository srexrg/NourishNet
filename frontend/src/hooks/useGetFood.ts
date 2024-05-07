import { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';

interface Food {
  _id: string;
  foodName: string;
  description: string;
  quantity: string;
  foodImage: string;
  sharedBy: string;

}

const useGetMyFoods = (): { food: Food[] | null; error: string | null; loading: boolean;reloadRequests: () => void } => {
  const { authUser } = useAuthContext() || {};
  console.log(authUser.token)
  const [food, setFood] = useState<Food[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

    const fetchFood = async () => {
      setLoading(true);
      try {
        if (!authUser) {
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/food/user`, {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to retrieve food items: ${response.statusText}`);
        }

        const data = await response.json();
        setFood(data);
      } catch (err) {
        console.error(err);
        setError('Failed to retrieve food items.');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchFood();
    }, [authUser]);
  
    const reloadRequests = () => {
      fetchFood();
    };

  return { food, error, loading,reloadRequests};
};

export default useGetMyFoods;
