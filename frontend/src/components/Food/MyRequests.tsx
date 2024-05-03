import React from "react";
import useGetRequests from "@/hooks/useGetRequests";
import RequestCard from "../RequestCard";
import { Link } from "react-router-dom";
import { FaHome, FaSpinner } from "react-icons/fa";

const MyRequests: React.FC = () => {
  const { request, reloadRequests, loading } = useGetRequests();

  const handleReloadRequests = () => {
    reloadRequests();
  };

  return (
    <section className="bg-gray-900 text-white py-20 h-full">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold mb-4">My Requests</h2>
          <Link to="/home">
            <FaHome className="text-white text-xl" />
          </Link>
        </div>

        {loading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {request && request.length > 0 ? (
              request.map((food, index) => (
                <RequestCard
                  key={`${food._id}-${index}`}
                  request={food}
                  reloadRequests={handleReloadRequests}
                />
              ))
            ) : (
              <p>You haven't made any food requests yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyRequests;
