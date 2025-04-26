import { MealData } from "@/services/api/meal/meal.service";

const MEAL_TYPES: MealData["type"][] = ["Morning", "Lunch", "Dinner", "Snack"];

const IMAGE_MAP: Record<MealData["type"], string[]> = {
  Morning: ["/images/m01.jpg"],
  Lunch: ["/images/l01.jpg", "/images/l02.jpg", "/images/l03.jpg"],
  Dinner: ["/images/d01.jpg", "/images/d02.jpg"],
  Snack: ["/images/s01.jpg"],
};

export interface MealSeedOptions {
  days?: number;
  startDate?: Date;
}

export class MealSeeder {
  private days: number;
  private startDate: Date;

  constructor(options: MealSeedOptions = {}) {
    this.days = options.days ?? 7;
    this.startDate = options.startDate ?? new Date();
  }

  generate(): MealData[] {
    const meals: MealData[] = [];
    let id = 1;

    for (let i = 0; i < this.days; i++) {
      const date = this.formatDate(this.offsetDate(-i));
      for (const type of MEAL_TYPES) {
        const image = this.pickImage(type, id);
        meals.push({ id: id++, type, date, image });
      }
    }

    return meals;
  }

  private offsetDate(daysOffset: number): Date {
    const d = new Date(this.startDate);
    d.setDate(d.getDate() + daysOffset);
    return d;
  }

  private formatDate(date: Date): string {
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return `${m}.${d}`;
  }

  private pickImage(type: MealData["type"], id: number): string {
    const pool = IMAGE_MAP[type];
    return pool[id % pool.length];
  }
}
