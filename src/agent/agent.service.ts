import { Injectable } from "@nestjs/common";
import { JokeService } from "src/services/joke.service";
import { MathService } from "src/services/math.service";
import { MovieService } from "src/services/movie.service";
import { NewsService } from "src/services/news.service";
import { WeatherService } from "src/services/weather.serivce";

@Injectable()
export class RouterService {
  constructor(
    private weatherService: WeatherService,
    private newsService: NewsService,
    private jokeService: JokeService,
    private mathService: MathService,
    private movieService: MovieService
  ) { }

  async route(intentObj: any) {
    const intent = (intentObj?.intent || "general").toLowerCase();

    switch (intent) {
      case "weather":
        return this.weatherService.getWeather(intentObj.location || intentObj.query  );
      case "news":
        return this.newsService.getLatestNews();
      case "joke":
        return this.jokeService.getRandomJoke();
      case "math":
        return this.mathService.solve(intentObj.formula || intentObj.query);
      case "movie":
        return this.movieService.recommend(intentObj.mood,
          intentObj.genre || intentObj.query);
      default:
        return { message: "Sorry, I didn't understand. Try a different query." };
    }
  }
}
