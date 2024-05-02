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
    requesterId: {
        username: string;
      };
}

const UseGetIncoming = () => {

    const { authUser } = useAuthContext() || {};

    const [request, setRequest] = useState<Request[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    const FetchIncoming = async () => {
        setLoading(true)

        try {
            if (!authUser) {
                return;
            }

            const response = await fetch(`/api/food/getIncomingRequests/${authUser._id}`);
            if (!response.ok) {
                throw new Error(`Failed to retrieve food items: ${response.statusText}`);
            }
            const data = await response.json()
            setRequest(data.requests);


        } catch (error) {
            console.error(error);
            setError('Failed to retrieve food items.');

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        FetchIncoming();
    }, [authUser]);

    const reloadRequests = () => {
        FetchIncoming();
      };

    return { request, error, loading,reloadRequests };
}

export default UseGetIncoming