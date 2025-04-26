import { type NextRequest } from "next/server";
import { ApiResponse } from "@/lib/https/http-response";
import { HttpStatus } from "@/lib/https/http-status";
import { Logger } from "@/lib/core/logger";
import { parseQueryParams } from "@/lib/query-parser";
import { HealthColumnService } from "@/services/api/health-column/health-column.service";

HealthColumnService.init();

export async function GET(req: NextRequest) {
  try {
    const { page, limit, filters } = parseQueryParams(req.url, [
      "category",
      "tag",
    ]);

    const category = filters?.category;
    const tag = filters?.tag;

    const filtered = HealthColumnService.filter({ category, tag });
    const { data, meta } = HealthColumnService.paginate(filtered, page, limit);

    return ApiResponse.success({ data, pagination: meta });
  } catch (err) {
    Logger.error("GET /api/columns failed", err);
    return ApiResponse.fail("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, image, category, tags } = body;

    if (!title || !description || !image || !category) {
      return ApiResponse.fail(
        "Missing required fields",
        HttpStatus.BAD_REQUEST
      );
    }

    const newColumn = HealthColumnService.create({
      title,
      description,
      image,
      category,
      tags: tags ?? [],
    });

    return ApiResponse.success(newColumn, HttpStatus.CREATED);
  } catch (err) {
    Logger.error("POST /api/columns failed", err);
    return ApiResponse.fail("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
