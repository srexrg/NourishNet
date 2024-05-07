import { Link } from "react-router-dom";
import { FaHome, FaSpinner } from "react-icons/fa";
import useGetMyFoods from "@/hooks/useGetFood";
import MyDonation from "../MyDonation";

const MyFoods: React.FC = () => {
  const { food, loading,reloadRequests } = useGetMyFoods();

  const handleReloadRequests = () => {
    reloadRequests();
  };

  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">My Food</h2>
          <Link to="/home">
            <FaHome className="text-white text-xl" />
          </Link>
        </div>
        {loading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
           {food && food.length > 0 ? (
              food.map((food, index) => (
                <MyDonation
                 key={`${food._id}-${index}`} 
                 food={food}
                 reloadRequests={handleReloadRequests}
                  />
              ))
            ) : (
              <p>You haven't added any food items yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyFoods;
