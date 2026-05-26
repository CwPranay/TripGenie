const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent";


const callGemini = async (prompt) => {

  const response = await fetch(
    `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );

 const data = await response.json();



if (!data.candidates) {
  throw new Error(
    JSON.stringify(data)
  );
}

return data.candidates[0].content.parts[0].text;
};




// EXTRACT STRUCTURED DATA
export const extractTravelData = async (text) => {
  try {

    const prompt = `
Extract structured travel booking information.

Return ONLY valid JSON.

Format:
{
  "destination": "",
  "startDate": "",
  "endDate": "",
  "hotel": "",
  "flight": "",
  "activities": []
}

Booking Text:
${text}
`;

    const response = await callGemini(prompt);

    const cleanedResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedResponse);

  } catch (error) {

    console.log(error);

    return null;
  }
};




// GENERATE ITINERARY
export const generateItinerary = async (
  structuredData
) => {

  try {

    const prompt = `
Generate a clean professional travel itinerary.

Travel Details:
${JSON.stringify(structuredData)}

Requirements:
- Day-wise plan
- Morning, afternoon, evening sections
- Food recommendations
- Local travel suggestions
- Hotel check-in/check-out reminders
- Important travel tips

Format neatly with headings and bullet points.
`;

    const response =
      await callGemini(prompt);

    return response;

  } catch (error) {

    console.log(error);

    return null;
  }
};