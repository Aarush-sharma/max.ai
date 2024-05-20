
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import {} from 'dotenv/config'
const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

export async function GET(req:NextApiRequest,res:NextApiResponse) {
  //req.body.messages
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "tell me who is pm of india" }],
    model: "gpt-3.5-turbo",
  });

  res.status(200).json({response:completion.choices[0]})
}
