import { Injectable } from "@nestjs/common";

@Injectable()
export class MathService {
  async solve(formula: string) {
    try {
      if (!formula) return { error: "No formula provided" };
      const safe = formula.replace(/[^-()\d/*+. %]/g, "");
      const result = eval(safe);
      return { formula, result };
    } catch (err) {
      return { error: "Failed to evaluate formula" };
    }
  }
}
