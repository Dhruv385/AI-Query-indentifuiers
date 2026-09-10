import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class WeatherService {
  private logger = new Logger(WeatherService.name);
  async getWeather(location: string) {
    if (!location) return { error: "No location provided" };
    try {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
      const { data } = await axios.get(url);
      return {
        city: data.name,
        temp: data.main.temp,
        description: data.weather[0].description
      };
    } catch (err: any) {
      this.logger.warn("Weather fetch failed", err?.response?.data || err?.message);
      return { error: `Could not fetch weather for ${location}` };
    }
  }
}
