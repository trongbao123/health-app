import { PaginationMeta, Paginator } from "@/lib/paginator";
import { MockColumnFactory } from "@/mocks/mock-column.factory";

export interface ColumnData {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: "column" | "diet" | "beauty" | "health";
  tags: string[];
}
export class HealthColumnService {
  private static db: ColumnData[] = [];

  static init() {
    if (this.db.length > 0) return;
    this.db = MockColumnFactory.generateMany(64);
  }

  static getAll(): ColumnData[] {
    return this.db;
  }

  static filter({
    category,
    tag,
  }: {
    category?: string;
    tag?: string;
  }): ColumnData[] {
    return this.db.filter(
      (c) =>
        (!category || c.category === category) && (!tag || c.tags.includes(tag))
    );
  }

  static paginate(
    items: ColumnData[],
    page = 1,
    limit = 8
  ): { data: ColumnData[]; meta: PaginationMeta } {
    const paginator = new Paginator<ColumnData>(items, page, limit);
    return paginator.paginate();
  }

  static create(data: Omit<ColumnData, "id" | "date">): ColumnData {
    if (!data.title || !data.description || !data.image || !data.category) {
      throw new Error("Missing required fields");
    }

    const id = this.generateNewId();
    const date = this.getTodayFormatted();

    const newColumn: ColumnData = {
      id,
      date,
      ...data,
    };

    this.db.push(newColumn);
    return newColumn;
  }

  private static generateNewId(): number {
    const maxId = this.db.reduce((max, column) => Math.max(max, column.id), 0);
    return maxId + 1;
  }

  private static getTodayFormatted(): string {
    const now = new Date();
    return `${now.getFullYear()}.${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${now.getDate().toString().padStart(2, "0")}`;
  }

  static findById(id: number): ColumnData | undefined {
    return this.db.find((c) => c.id === id);
  }
}
