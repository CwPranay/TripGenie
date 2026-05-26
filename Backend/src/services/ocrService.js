import Tesseract from "tesseract.js"

const extractTextFromImage = async (FilePath) =>{
    const {
        data:{text},
    } = await Tesseract.recognize(FilePath,"eng");

    return text;
}

export default extractTextFromImage;