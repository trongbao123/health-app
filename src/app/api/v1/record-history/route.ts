import { type NextRequest } from "next/server";

import { ApiResponse } from "@/lib/https/http-response";
import { HttpStatus } from "@/lib/https/http-status";
import { Logger } from "@/lib/core/logger";
import { parseQueryParams } from "@/lib/query-parser";
import { ExerciseRecordService } from "@/services/api/excercise-record/excercise-record.service";

ExerciseRecordService.init();

export async function GET(req: NextRequest) {
  try {
    const { page, limit, filters } = parseQueryParams(req.url, [
      "minCalories",
      "maxCalories",
    ]);

    const minCalories = filters?.minCalories
      ? Number(filters.minCalories)
      : undefined;
    const maxCalories = filters?.maxCalories
      ? Number(filters.maxCalories)
      : undefined;

    const filtered = ExerciseRecordService.filter({ minCalories, maxCalories });
    const { data, meta } = ExerciseRecordService.paginate(
      filtered,
      page,
      limit
    );

    return ApiResponse.success({ data, pagination: meta });
  } catch (err) {
    Logger.error("GET /api/exercise-record failed", err);
    return ApiResponse.fail(
      "Failed to fetch exercises",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, calories, duration } = body;

    if (!name || calories === undefined || duration === undefined) {
      return ApiResponse.fail(
        "Missing required fields",
        HttpStatus.BAD_REQUEST
      );
    }

    const newExercise = ExerciseRecordService.create({
      name,
      calories,
      duration,
    });
    return ApiResponse.success(newExercise, HttpStatus.CREATED);
  } catch (err) {
    Logger.error("POST /api/exercise-record failed", err);
    return ApiResponse.fail(
      "Failed to create exercise",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
