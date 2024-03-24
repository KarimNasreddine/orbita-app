import { OpenAI } from "openai";
import { env } from "process";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { imageUrl } = await req.json();

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "Image URL is required" }), {
      status: 400,
    });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What's in this image?" },
          { type: "image_url", image_url: imageUrl },
        ],
      },
    ],
  });

  const description = response.choices[0].message.content;

  console.log("Description: ", description);

  return new Response(JSON.stringify({ description }), {
    status: 200,
  });
}
