import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

async function test() {
  try {

    const result =
      await model.generateContent("hello");

    const response =
      await result.response.text();

    console.log(response);

  } catch (error) {

    console.log(error);
  }
}

test();