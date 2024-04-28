import useGetMyFoods from "@/hooks/useGetFood";
// import FoodItem from "../FoodItem";
import MyDonation from "../MyDonation";

const MyFoods: React.FC = () => {
  const { food } = useGetMyFoods();

  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">My Food</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {food ? (
            food.map((food, index) => (
              <MyDonation key={`${food._id}-${index}`} food={food} />
            ))
          ) : (
            <p>You haven't shared any food items yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyFoods;
