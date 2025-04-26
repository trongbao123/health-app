import { DiaryRecordData } from "@/services/api/diary-record/diary-record.service";

const DEFAULT_CONTENT =
  "私の日記の記録が一部表示されます。テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト...";
export class DiarySeeder {
  static seedAll(): DiaryRecordData[] {
    const staticEntries = DiarySeeder.seedStatic(8);
    const mockEntries = DiarySeeder.seedMock(5, 8, 100);
    return [...staticEntries, ...mockEntries];
  }

  private static seedStatic(count: number): DiaryRecordData[] {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      date: "2021.05.21",
      time: "23:25",
      content: DEFAULT_CONTENT,
    }));
  }

  private static seedMock(
    days: number,
    itemsPerDay: number,
    startId: number
  ): DiaryRecordData[] {
    return Array.from({ length: days * itemsPerDay }, (_, i) => {
      const dayOffset = Math.floor(i / itemsPerDay);
      const day = (20 - dayOffset).toString().padStart(2, "0");
      return {
        id: startId + i,
        date: `2021.05.${day}`,
        time: "23:25",
        content: DEFAULT_CONTENT,
      };
    });
  }
}
