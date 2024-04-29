import useGetRequests from "@/hooks/useGetRequests";
import RequestCard from "../MyRequests";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const MyRequests: React.FC = () => {
  const { request } = useGetRequests();

  return (
    <section className="bg-gray-900 text-white py-20 h-full">
      <div className="container mx-auto px-4 h-full">
      <div className="flex justify-between items-center mb-8">
      <h2 className="text-4xl font-bold mb-4">My Requests</h2>
        <Link to="/home"> 
            <FaHome className="text-white text-xl" /> 
          </Link>
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {request ? (
            request.map((food, index) => (
              <RequestCard key={`${food._id}-${index}`} request={food} />
            ))
          ) : (
            <p>You haven't shared any food items yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyRequests;
