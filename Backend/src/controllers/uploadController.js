import extractTextFromPDF from "../services/pdfService.js";
import extractTextFromImage from "../services/ocrService.js";
import Itinerary from "../models/Itinerary.js"

import {
    extractTravelData,
    generateItinerary,
} from "../services/geminiService.js";


export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" })
        }

        const filePath = req.file.path
        const mimeType = req.file.mimetype;

        let extractedText = "";

        if (mimeType === "application/pdf") {
            extractedText = await extractTextFromPDF(filePath)
        }
        else if (
            mimeType === "image/png" ||
            mimeType === "image/jpeg" ||
            mimeType === "image/jpg"
        ) {
            extractedText = await extractTextFromImage(filePath)
        }
        if (!extractedText.trim()) {
            return res.status(400).json({
                message: "No text extracted from file",
            });
        }

        // AI EXTRACTION
        const structuredData =
            await extractTravelData(extractedText);

        if (!structuredData) {
            return res.status(500).json({
                message: "Failed to structure travel data",
            });
        }

        // AI ITINERARY
        const itinerary =
            await generateItinerary(structuredData);
        
        

        if (!itinerary) {
            return res.status(500).json({
                message: "Failed to generate itinerary",
            });
        }

        const savedItinerary = await Itinerary.create({
            user:req.user._id,
            originalFile:req.file.filename,
            extractedText,
            structuredData,
            itinerary,
            shareId:crypto.randomUUID()
        })
        res.status(200).json({
            success: true,
            itinerary: savedItinerary,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}