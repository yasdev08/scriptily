import { NextResponse } from "next/server";
import axios from "axios";

const REMOVED = "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";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!REMOVED) throw new Error("HF API token missing.");

    const response = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "MiniMaxAI/MiniMax-M2:novita",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        
      },
      {
        headers: {
          Authorization: `Bearer ${REMOVED}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Hugging Face API Response:", response.data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Hugging Face API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to generate text", details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
