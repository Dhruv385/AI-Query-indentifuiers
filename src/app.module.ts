import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Agent } from "http";
import { AgentSchema } from "./schema/agent.schame";
import { AppController } from "./app.controller";
import { IntentService } from "./intent/intent.service";
import { RouterService } from "./agent/agent.service";
import { WeatherService } from "./services/weather.serivce";
import { NewsService } from "./services/news.service";
import { JokeService } from "./services/joke.service";
import { MathService } from "./services/math.service";
import { MovieService } from "./services/movie.service";
import { ChatHistory, ChatHistorySchema } from "./schema/chat-history.schema";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || "mongodb://localhost:27017/llm_intent"),
    MongooseModule.forFeature([
      { name: Agent.name, schema: AgentSchema },
      { name: ChatHistory.name, schema: ChatHistorySchema },
    ]),
  ],
  controllers: [AppController],
  providers: [
    IntentService,
    RouterService,
    WeatherService,
    NewsService,
    JokeService,
    MathService,
    MovieService,
  ],
})
export class AppModule {}
