import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class NewsService {
  private apiKey = process.env.NEWS_API_KEY;
  private BASE_URL = "https://newsapi.org/v2";

  async getLatestNews() {
    try {
      const response = await axios.get(`${this.BASE_URL}/top-headlines`, {
        params: {
          country: "us",
          pageSize: 5,
          apiKey: this.apiKey
        }
      });

      return response.data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        source: article.source.name,
        url: article.url,
        image: article.urlToImage
      }));
    } catch (error) {
      console.error("News API Error:", error.message);
      return [{ title: "Failed to fetch news", source: "system" }];
    }
  }
}
