export type BodyProgressData = {
  date: string;
  weight: number;
  fat: number;
};

export type Period = "year" | "month" | "week" | "day";

const MONTHS = [
  "06月",
  "07月",
  "08月",
  "09月",
  "10月",
  "11月",
  "12月",
  "01月",
  "02月",
  "03月",
  "04月",
  "05月",
];

export class BodyProgressService {
  private static readonly db: BodyProgressData[] =
    BodyProgressService.generateBodyProgress();
  private static readonly progressRate = 75;
  private static generateBodyProgress(): BodyProgressData[] {
    let weight = 40 + Math.random() * 5;
    let fat = weight - (10 + Math.random() * 5);

    return MONTHS.map((month, index) => {
      const weightChange = -(Math.random() * 5) + Math.random() * 0.5;
      const fatChange = -(Math.random() * 2) + Math.random() * 0.5;

      weight += weightChange;
      fat += fatChange;

      weight = Math.min(weight, 80 - index * (2 + Math.random() * 0.5));
      fat = Math.min(fat, 75 - index * (1.8 + Math.random() * 0.7));

      return {
        date: month,
        weight: Math.round(weight * 10) / 10,
        fat: Math.round(fat * 10) / 10,
      };
    });
  }

  static getAll(): BodyProgressData[] {
    return this.db;
  }

  static getFiltered(period: Period = "year"): BodyProgressData[] {
    const limitMap: Record<Period, number> = {
      year: this.db.length,
      month: 3,
      week: 1,
      day: 1,
    };

    return this.db.slice(-limitMap[period]);
  }

  static getProgressRate(): number {
    return this.progressRate;
  }

  static add(entry: BodyProgressData): BodyProgressData {
    this.db.push(entry);
    return entry;
  }
}
