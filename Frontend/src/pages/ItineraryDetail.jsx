
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../api/axios"
import ReactMarkdown from "react-markdown"

const ItineraryDetail = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState()

    const fetchTrip = async () => {
        try {
            const { data } = await API.get(`itineraries/${id}`)
            setTrip(data.itinerary)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        fetchTrip()
    }, [])
    if (!trip) {
        return (
            <div className="p-10">
                Loading...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">

            <div className="max-w-5xl mx-auto space-y-8">

                {/* HEADER */}

                <div className="bg-white rounded-3xl p-8 shadow-sm">

                    <h1 className="text-4xl font-bold">
                        {
                            trip.structuredData
                                ?.destination
                        }
                    </h1>

                    <p className="text-gray-500 mt-3">
                        {
                            trip.structuredData
                                ?.startDate
                        }
                    </p>

                </div>

                {/* DETAILS */}

                <div className="bg-white rounded-3xl p-8 shadow-sm">

                    <h2 className="text-2xl font-bold mb-6">
                        Trip Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <p className="font-semibold">
                                Flight
                            </p>

                            <p className="text-gray-600">
                                {
                                    trip.structuredData
                                        ?.flight
                                }
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold">
                                Hotel
                            </p>

                            <p className="text-gray-600">
                                {
                                    trip.structuredData
                                        ?.hotel || "N/A"
                                }
                            </p>
                        </div>

                    </div>

                </div>

                {/* ITINERARY */}

                <div className="bg-white rounded-3xl p-8 shadow-sm">

                    <h2 className="text-2xl font-bold mb-6">
                        AI Itinerary
                    </h2>

                    <div className="prose max-w-none">

                        <ReactMarkdown>
                            {trip.itinerary}
                        </ReactMarkdown>

                    </div>

                </div>

            </div>

        </div>
    );


}
export default ItineraryDetail;