import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../api/axios";

import ReactMarkdown from "react-markdown";

const SharePage = () => {
  const { shareId } = useParams();

  const [trip, setTrip] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchTrip = async () => {
    try {
      const { data } = await API.get(
        `/itineraries/share/${shareId}`
      );

      setTrip(data.itinerary);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/60 flex items-center justify-center px-6">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />

            <p className="text-sm text-gray-600">
              Loading shared itinerary...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50/60 flex items-center justify-center px-6">
        <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-sm text-center max-w-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Itinerary Not Found
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed">
            This shared itinerary may have expired or the link is invalid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="h-1.5 w-full bg-sky-400" />

          <div className="p-8">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 mb-5">
              Shared AI Itinerary
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              {trip?.structuredData?.destination ||
                "Untitled Trip"}
            </h1>

            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-2xl">
              Explore this AI-generated travel itinerary shared with you.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {trip?.structuredData?.startDate && (
                <div className="rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-600">
                  Start Date:{" "}
                  {new Date(
                    trip.structuredData.startDate
                  ).toLocaleDateString()}
                </div>
              )}

              {trip?.structuredData?.destination && (
                <div className="rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-600">
                  Destination:{" "}
                  {trip.structuredData.destination}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Travel Plan
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Complete AI-generated itinerary details.
              </p>
            </div>

            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-li:text-gray-600">
              <ReactMarkdown>
                {trip?.itinerary || ""}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePage;