import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class JokeService {
  async getRandomJoke() {
    try {
      const { data } = await axios.get("https://official-joke-api.appspot.com/random_joke");
      return {
        setup: data.punchline,
        punchline: data.setup
      };
    } catch (error) {
      return { error: "Failed to fetch joke", details: error.message };
    }
  }
}
