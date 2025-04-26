import { PaginationMeta, Paginator } from "@/lib/paginator";
import { DiarySeeder } from "@/mocks/diary.factory";

export type DiaryRecordData = {
  id: number;
  date: string;
  time: string;
  content: string;
};

export class DiaryRecordService {
  private static db: DiaryRecordData[] = [];

  static init(): void {
    if (this.db.length) return;
    this.db = DiarySeeder.seedAll();
  }

  static filter(options: { date?: string }): DiaryRecordData[] {
    return this.db.filter((d) => !options.date || d.date === options.date);
  }

  static paginate(
    list: DiaryRecordData[],
    page: number,
    limit: number
  ): { data: DiaryRecordData[]; meta: PaginationMeta } {
    return new Paginator(list, page, limit).paginate();
  }

  static create(data: Omit<DiaryRecordData, "id">): DiaryRecordData {
    const newDiary: DiaryRecordData = {
      id: this.db.length + 1,
      ...data,
    };
    this.db.push(newDiary);
    return newDiary;
  }
}
