import { type NextRequest } from "next/server";
import { ApiResponse } from "@/lib/https/http-response";
import { HttpStatus } from "@/lib/https/http-status";
import { Logger } from "@/lib/core/logger";
import { parseQueryParams } from "@/lib/query-parser";
import { MealService } from "@/services/api/meal/meal.service";

MealService.init();

export async function GET(req: NextRequest) {
  try {
    const { page, limit, filters } = parseQueryParams(req.url, [
      "type",
      "date",
    ]);
    const { type, date } = filters ?? {};

    const filtered = MealService.filter({ type, date });
    const { data, meta } = MealService.paginate(filtered, page, limit);

    return ApiResponse.success({ data, pagination: meta });
  } catch (err) {
    Logger.error("GET /api/meals failed", err);
    return ApiResponse.fail(
      "Failed to fetch meals",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, date, image } = body;

    if (!type || !date || !image) {
      return ApiResponse.fail(
        "Missing required fields",
        HttpStatus.BAD_REQUEST
      );
    }

    const newMeal = MealService.create({ type, date, image });
    return ApiResponse.success(newMeal, HttpStatus.CREATED);
  } catch (err) {
    Logger.error("POST /api/meals failed", err);
    return ApiResponse.fail(
      "Failed to create meal",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
