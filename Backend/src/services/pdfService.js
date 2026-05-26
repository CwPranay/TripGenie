import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const extractTextFromPDF = async (filePath) => {
  try {
   const dataBuffer = fs.readFileSync(filePath);

    const data = await pdf(dataBuffer);
    return data.text;

  } catch (error) {
    console.log("PDF ERROR:");
    console.log(error);

    return "";
  }
};

export default extractTextFromPDF;