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
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
          <div className="h-32 bg-sky-500 relative">
            <div className="absolute inset-0 bg-black/5" />
            <div className="absolute bottom-0 left-0 right-0 p-8 pb-6">
              <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white mb-3 border border-white/30">
                🌍 Shared Itinerary
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white leading-tight drop-shadow-lg">
                {trip?.structuredData?.destination ||
                  "Untitled Trip"}
              </h1>
            </div>
          </div>

          <div className="p-8 pt-6">
            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mb-6">
              Explore this AI-generated travel itinerary shared with you.
            </p>

            <div className="flex flex-wrap gap-3">
              {trip?.structuredData?.startDate && (
                <div className="rounded-xl bg-sky-50 border border-sky-100 px-4 py-2.5 text-sm text-gray-700">
                  <span className="font-semibold text-gray-500 text-xs uppercase tracking-wide block mb-0.5">Start Date</span>
                  <span className="font-medium">
                    {new Date(
                      trip.structuredData.startDate
                    ).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              )}

              {trip?.structuredData?.destination && (
                <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-2.5 text-sm text-gray-700">
                  <span className="font-semibold text-gray-500 text-xs uppercase tracking-wide block mb-0.5">Destination</span>
                  <span className="font-medium">
                    {trip.structuredData.destination}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm">
                ✨
              </span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Travel Plan
                </h2>
                <p className="text-sm text-gray-500">
                  Complete AI-generated itinerary details
                </p>
              </div>
            </div>

            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-li:text-gray-700">
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