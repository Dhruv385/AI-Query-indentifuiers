import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class ChatHistory {
  @Prop()
  query: string;

  @Prop({ type: Object })
  response: any;
}

export type ChatHistoryDocument = HydratedDocument<ChatHistory>;
export const ChatHistorySchema = SchemaFactory.createForClass(ChatHistory);

