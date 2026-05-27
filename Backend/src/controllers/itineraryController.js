
import Itinerary from "../models/Itinerary.js";

export const getUserItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({
            user: req.user._id,
        }).sort({ createdAt: -1 })

        res.status(200).json({
            success:true,
            itineraries,
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })

    }
}