import { ColumnData } from "@/services/api/health-column/health-column.service";

export class MockColumnFactory {
  static generate(id: number): ColumnData {
    return {
      id,
      title:
        "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      description:
        "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリットとは？",
      image: `/images/column-${((id - 1) % 8) + 1}.jpg`,
      date: `2021.05.${(10 + (id % 20)).toString().padStart(2, "0")}`,
      category: ["column", "diet", "beauty", "health"][
        id % 4
      ] as ColumnData["category"],
      tags: ["魚料理", "和食", "DHA"],
    };
  }

  static generateMany(count: number): ColumnData[] {
    return Array.from({ length: count }, (_, i) => this.generate(i + 1));
  }
}
