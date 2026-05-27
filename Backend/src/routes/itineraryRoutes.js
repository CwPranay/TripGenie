import express from "express"
import protect from "../middleware/authMiddleware.js"
import {
    getUserItineraries,
    getSharedItinerary,
    getSingleItinerary
    
} from "../controllers/itineraryController.js";



const router = express.Router()

router.get("/",protect, getUserItineraries)
router.get(
  "/share/:shareId",
  getSharedItinerary
);
router.get(
  "/:id",
  protect,
  getSingleItinerary
);
export default router;