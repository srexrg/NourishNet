import { Link } from "react-router-dom";
import { FaHome, FaSpinner, FaPlus } from "react-icons/fa";
import useGetMyFoods from "@/hooks/useGetFood";
import MyDonation from "../MyDonation";
import { Button } from "../ui/button";

const MyFoods: React.FC = () => {
  const { food, loading, reloadRequests } = useGetMyFoods();

  const handleReloadRequests = () => {
    reloadRequests();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight">My Donations</h2>
            <Button
              variant="outline"
              size="icon"
              onClick={handleReloadRequests}
              className="ml-2"
              disabled={loading}
            >
              <FaSpinner
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              <span className="sr-only">Reload</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link to="/add" className="flex items-center gap-2">
                <FaPlus className="h-4 w-4" />
                Add New Food
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link to="/home">
                <FaHome className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <FaSpinner className="animate-spin h-8 w-8 text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {food && food.length > 0 ? (
              food.map((food, index) => (
                <MyDonation
                  key={`${food._id}-${index}`}
                  food={food}
                  reloadRequests={handleReloadRequests}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] text-center">
                <p className="text-muted-foreground text-lg mb-4">
                  You haven't added any food items yet.
                </p>
                <Button asChild>
                  <Link to="/add" className="flex items-center gap-2">
                    <FaPlus className="h-4 w-4" />
                    Add Your First Food Item
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFoods;
