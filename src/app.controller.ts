import { Body, Controller, Post } from "@nestjs/common";
import { IntentService } from "./intent/intent.service";
import { RouterService } from "./agent/agent.service";
import { AskDto } from "./dto/ask.dto";

@Controller()
export class AppController {
  constructor(
    private readonly intentService: IntentService,
    private readonly routerService: RouterService,
  ) {}

  @Post("ask")
  async ask(@Body() body: AskDto) {
    const { query } = body;
    const intentObj = await this.intentService.classify(query);
    const response = await this.routerService.route(intentObj);

    return {
      query,
      detectedIntent: intentObj,
      response,
    };
  }
}
