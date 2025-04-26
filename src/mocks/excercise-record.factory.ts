import { ExerciseRecordData } from "@/services/api/excercise-record/excercise-record.service";

const STATIC_RECORD: Omit<ExerciseRecordData, "id"> = {
  name: "家事全般（立位・軽い）",
  calories: 26,
  duration: 10,
};

const RANDOM_NAMES = [
  "ウォーキング（平地）",
  "ジョギング",
  "水泳（ゆっくり）",
  "サイクリング",
  "ヨガ",
  "ストレッチ",
  "筋トレ（軽度）",
  "ダンス",
];

export class ExerciseRecordSeeder {
  static seedAll(staticCount = 8, randomCount = 20): ExerciseRecordData[] {
    const statics = this.generateStatic(staticCount);
    const randoms = this.generateRandom(randomCount, statics.length + 1);
    return [...statics, ...randoms];
  }

  private static generateStatic(count: number): ExerciseRecordData[] {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      ...STATIC_RECORD,
    }));
  }

  private static generateRandom(
    count: number,
    startId = 1
  ): ExerciseRecordData[] {
    return Array.from({ length: count }, (_, i) => ({
      id: startId + i,
      name: RANDOM_NAMES[i % RANDOM_NAMES.length],
      calories: 20 + Math.floor(Math.random() * 100),
      duration: 5 + Math.floor(Math.random() * 30),
    }));
  }
}
