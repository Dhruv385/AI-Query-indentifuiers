import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { AgentTOON } from "./schema/agent.toon";

@Injectable()
export class IntentService {
  private logger = new Logger(IntentService.name);
  private readonly GROQ_BASE = "https://api.groq.com/openai/v1";
  private readonly MODEL = "llama-3.1-8b-instant";

  async classify(query: string) {
    const prompt = `
You are an intent classifier. Classify the user's query according to this JSON schema:
${JSON.stringify(AgentTOON, null, 2)}

Return ONLY valid JSON that conforms to the schema. Do not include any extra text or explanation.

User query:
"${query}"
`;

    try {
      const res = await axios.post(
        `${this.GROQ_BASE}/chat/completions`,
        {
          model: this.MODEL,
          messages: [{ role: "user", content: prompt }],
          temperature: 0
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const content = res.data?.choices?.[0]?.message?.content || res.data?.choices?.[0]?.text || JSON.stringify(res.data);
      const text = typeof content === "string" ? content : (content.text ?? JSON.stringify(content));

      const cleaned = this.extractJson(text);
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (err: any) {
      this.logger.error("LLM classify error", err?.response?.data || err?.message);
      throw new Error("Failed to classify intent");
    }
  }

  private extractJson(text: string) {
    text = text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "").trim();
    }
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first !== -1 && last !== -1 && last >= first) {
      return text.substring(first, last + 1);
    }
    return text;
  }
}
