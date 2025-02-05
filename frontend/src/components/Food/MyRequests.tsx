import React from "react";
import useGetRequests from "@/hooks/useGetRequests";
import RequestCard from "../RequestCard";
import { Link } from "react-router-dom";
import { FaHome, FaSpinner, FaSync } from "react-icons/fa";
import { Button } from "../ui/button";

const MyRequests: React.FC = () => {
  const { request, reloadRequests, loading } = useGetRequests();

  const handleReloadRequests = () => {
    reloadRequests();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight">My Requests</h2>
            <Button
              variant="outline"
              size="icon"
              onClick={handleReloadRequests}
              className="ml-2"
              disabled={loading}
            >
              <FaSync className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span className="sr-only">Reload</span>
            </Button>
          </div>
          <Button variant="outline" size="icon" asChild>
            <Link to="/home">
              <FaHome className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <FaSpinner className="animate-spin h-8 w-8 text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {request && request.length > 0 ? (
              request.map((food, index) => (
                <RequestCard
                  key={`${food._id}-${index}`}
                  request={food}
                  reloadRequests={handleReloadRequests}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] text-center">
                <p className="text-muted-foreground text-lg">
                  You haven't made any food requests yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
