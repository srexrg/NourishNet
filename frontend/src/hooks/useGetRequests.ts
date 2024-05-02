import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

interface Request {
  _id: string;
  donorId: string;
  foodName: string;
  location: string;
  description: string;
  quantity: string;
  foodImage: string;
  sharedBy: string;
  status: string;
}

const useGetRequests = () => {
  const { authUser } = useAuthContext() || {};

  const [request, setRequest] = useState<Request[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      if (!authUser) {
        return;
      }

      const response = await fetch(`https://nourishnet-vt0k.onrender.com/api/food/getRequest/${authUser._id}`);

      if (!response.ok) {
        throw new Error(`Failed to retrieve food items: ${response.statusText}`);
      }

      const data = await response.json();
      setRequest(data.requests);
    } catch (err) {
      console.error(err);
      setError('Failed to retrieve food items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [authUser]);

  const reloadRequests = () => {
    fetchRequests();
  };

  return { request, error, loading, reloadRequests };
};

export default useGetRequests;
