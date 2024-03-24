// src/app/api/openai/route.ts

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export const dynamic = 'force-dynamic'; // Force the Route Handler to be evaluated dynamically

export async function POST(request: NextRequest) {
  
  try {
  
    // Parse the request body as JSON
  const requestBody = await request.json();
  const query = requestBody.query;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: query }],
    model: "gpt-3.5-turbo",
});


  // Respond with a JSON object containing the query
  return  NextResponse.json({response: chatCompletion.choices.values });

  
} catch (error)
 {
    return new NextResponse('Invalid JSON date', {status: 400})
}
}   

