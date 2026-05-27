import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

import API from "../api/axios";

const Dashboard = () => {

  const [itineraries, setItineraries] =
    useState([]);
  const navigate = useNavigate();
  const fetchItineraries = async () => {

    try {

      const { data } = await API.get(
        "/itineraries"
      );

      setItineraries(data.itineraries);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <div className="min-h-screen p-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          My Trips
        </h1>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        {itineraries.map((trip) => (

          <div
            key={trip._id}
            onClick={() =>
              navigate(`/itineraries/${trip._id}`)
            }
            className="border rounded-2xl cursor-pointer hover:shadow-lg transition p-5 shadow"
          >

            <h2 className="text-xl font-semibold">
              {
                trip.structuredData
                  ?.destination
              }
            </h2>

            <p className="text-gray-500 mt-2">
              {
                trip.structuredData
                  ?.startDate
              }
            </p>

            <p className="mt-4 line-clamp-3">
              {trip.itinerary}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Dashboard;