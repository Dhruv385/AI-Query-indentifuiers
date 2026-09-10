import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class MovieService {
  private readonly client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async recommend(userMood?: string, genre?: string) {
    try {
      const dynamicPrompt = `Give me ONE movie recommendation (only one).
Make it different every time.
User mood: ${userMood || "not specified"}
Preferred genre: ${genre || "any"}

Return strict JSON in this format:
{
  "title": "",
  "overview": "",
  "genre": "",
  "year": "",
  "rating": "",
  "why_recommended": ""
}
`;

      const response = await this.client.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "user",
            content: dynamicPrompt,
          },
        ],
        temperature: 1,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        return { error: "No content in response" };
      }
      const movie = JSON.parse(content);

      return movie;
    } catch (err) {
      console.error("LLM ERROR:", err);
      return { error: "Failed to generate movie recommendation" };
    }
  }
}
