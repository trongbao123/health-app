import { type NextRequest } from "next/server";
import { ApiResponse } from "@/lib/https/http-response";
import { HttpStatus } from "@/lib/https/http-status";
import { Logger } from "@/lib/core/logger";
import {
  BodyProgressService,
  Period,
} from "@/services/api/body-progress/body-progress.service";
const REQUIRED_FIELDS = ["date", "weight", "fat"] as const;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const period = (searchParams.get("period") ?? "year") as Period;

    const rate = BodyProgressService.getProgressRate();
    const data = BodyProgressService.getFiltered(period);

    return ApiResponse.success({ achievementRate: rate, bodyProgress: data });
  } catch (err) {
    Logger.error("GET /api/body-progress failed", err);
    return ApiResponse.fail("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    for (const field of REQUIRED_FIELDS) {
      if (
        body[field] === undefined ||
        body[field] === null ||
        body[field] === ""
      ) {
        return ApiResponse.fail(
          `Missing required field: ${field}`,
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      }
    }

    const newEntry = BodyProgressService.add({
      date: body.date,
      weight: body.weight,
      fat: body.fat,
    });

    return ApiResponse.success(newEntry, HttpStatus.CREATED);
  } catch (err) {
    Logger.error("POST /api/body-progress failed", err);
    return ApiResponse.fail("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
