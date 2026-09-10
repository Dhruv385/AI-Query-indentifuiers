export const AgentTOON = {
  type: "object",
  properties: {
    intent: { type: "string", enum: ["weather", "news", "joke", "math", "movie", "general"] },
    location: { type: "string" },
    formula: { type: "string" },
    query: { type: "string" }
  },
  required: ["intent"]
};