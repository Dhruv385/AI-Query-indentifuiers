import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Agent {
  @Prop({ required: true, enum: ["weather", "news", "joke", "math", "movie", "general"] })
  intent: string;

  @Prop()
  location?: string;

  @Prop()
  formula?: string;

  @Prop()
  query?: string;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);

export type AgentDocument = Agent & HydratedDocument<Document>;