import { Paginator } from "@/lib/paginator";
import { ExerciseRecordSeeder } from "@/mocks/excercise-record.factory";

export type ExerciseRecordData = {
  id: number;
  name: string;
  calories: number;
  duration: number;
};
export class ExerciseRecordService {
  private static db: ExerciseRecordData[] = [];

  static init(): void {
    if (this.db.length) return;
    this.db = ExerciseRecordSeeder.seedAll();
  }

  static filter({
    minCalories,
    maxCalories,
  }: {
    minCalories?: number;
    maxCalories?: number;
  }): ExerciseRecordData[] {
    return this.db.filter(
      (e) =>
        (minCalories === undefined || e.calories >= minCalories) &&
        (maxCalories === undefined || e.calories <= maxCalories)
    );
  }

  static paginate(data: ExerciseRecordData[], page: number, limit: number) {
    return new Paginator<ExerciseRecordData>(data, page, limit).paginate();
  }

  static create(input: Omit<ExerciseRecordData, "id">): ExerciseRecordData {
    const newItem: ExerciseRecordData = {
      id: (this.db.at(-1)?.id || 0) + 1 || 1,
      ...input,
    };
    this.db.push(newItem);
    return newItem;
  }
}
