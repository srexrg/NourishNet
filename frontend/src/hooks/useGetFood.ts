import  { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';

interface Food {
    _id: string;
  foodName: string;
  description: string;
  quantity: string;
  foodImage: string;
  sharedBy: string;

}

const useGetMyFoods = (): { food: Food[] | null; error: string | null; loading: boolean } => {
    const { authUser } = useAuthContext() || {};
    console.log(authUser)
    const [food, setFood] = useState<Food[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchFood = async () => {
        setLoading(true); 
        try {
          if (!authUser) {
            return;
          }
  
          const response = await fetch('https://nourish-net-backend.vercel.app/api/food/user', {
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
  
      fetchFood();
    }, [authUser]); 
  
    return { food, error, loading }; 
  };
  
  export default useGetMyFoods;
