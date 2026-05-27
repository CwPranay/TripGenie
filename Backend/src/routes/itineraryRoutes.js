import express from "express"
import protect from "../middleware/authMiddleware.js"
import {
    getUserItineraries,
} from "../controllers/itineraryController.js";



const router = express.Router()

router.get("/",protect, getUserItineraries)
export default router;