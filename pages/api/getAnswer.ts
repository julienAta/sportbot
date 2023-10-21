import OpenAIApi from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Replace with your OpenAI API key

const openai = new OpenAIApi({ apiKey: OPENAI_API_KEY });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { sport, question } = req.query; // Extract question from query params

  const messageContent = `Question about ${sport}: ${question}`;

  if (typeof sport !== "string" || typeof question !== "string") {
    res.status(400).send("Invalid parameters");
    return;
  }

  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",

      messages: [{ role: "user", content: messageContent }],
      max_tokens: 150,
    });

    const answer = gptResponse.choices[0]?.message.content;
    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).send("Error in processing the request.");
  }
};
