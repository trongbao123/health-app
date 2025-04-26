import { type NextRequest } from "next/server";
import { HttpStatus } from "@/lib/https/http-status";
import { ApiResponse } from "@/lib/https/http-response";
import { Logger } from "@/lib/core/logger";
import { parseQueryParams } from "@/lib/query-parser";
import { DiaryRecordService } from "@/services/api/diary-record/diary-record.service";

DiaryRecordService.init();

export async function GET(request: NextRequest) {
  try {
    const { page, limit, filters } = parseQueryParams(request.url, ["date"]);
    const date = filters?.date;
    const filtered = DiaryRecordService.filter({ date });
    const { data, meta } = DiaryRecordService.paginate(filtered, page, limit);

    return ApiResponse.success({ data, pagination: meta });
  } catch (error) {
    Logger.error("GET /api/diaries failed:", error);
    return ApiResponse.fail(
      "Failed to fetch diaries",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, content } = body;

    if (!date || !time || !content) {
      return ApiResponse.fail(
        "Missing required fields",
        HttpStatus.BAD_REQUEST
      );
    }

    const newDiary = DiaryRecordService.create({ date, time, content });
    return ApiResponse.success(newDiary, HttpStatus.CREATED);
  } catch (error) {
    Logger.error("POST /api/diaries failed:", error);
    return ApiResponse.fail(
      "Failed to create diary",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
