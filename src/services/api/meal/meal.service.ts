import { PaginationMeta, Paginator } from "@/lib/paginator";
import { MealSeeder } from "@/mocks/meal.factory";
export interface MealData {
  id: number;
  date: string;
  type: "Morning" | "Lunch" | "Dinner" | "Snack";
  image: string;
}

export class MealService {
  private static db: MealData[] = [];

  static init(): void {
    if (this.db.length) return;
    const seeder = new MealSeeder({ days: 5 });
    this.db = seeder.generate();
  }
  static filter({ type, date }: { type?: string; date?: string }): MealData[] {
    return this.db.filter(
      (m) => (!type || m.type === type) && (!date || m.date === date)
    );
  }

  static paginate(
    data: MealData[],
    page: number,
    limit: number
  ): { data: MealData[]; meta: PaginationMeta } {
    const paginator = new Paginator<MealData>(data, page, limit);
    return paginator.paginate();
  }

  static create(meal: Omit<MealData, "id">): MealData {
    const newMeal: MealData = {
      id: this.db.reduce((max, m) => Math.max(max, m.id), 0) + 1,
      ...meal,
    };
    this.db.push(newMeal);
    return newMeal;
  }

  static findById(id: number): MealData | undefined {
    return this.db.find((meal) => meal.id === id);
  }

  static updateById(
    id: number,
    update: Partial<Omit<MealData, "id">>
  ): MealData | null {
    const index = this.db.findIndex((meal) => meal.id === id);
    if (index === -1) return null;
    this.db[index] = { ...this.db[index], ...update };
    return this.db[index];
  }

  static deleteById(id: number): boolean {
    const index = this.db.findIndex((meal) => meal.id === id);
    if (index === -1) return false;
    this.db.splice(index, 1);
    return true;
  }
}
