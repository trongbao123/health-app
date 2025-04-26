import { type NextRequest } from "next/server";
import { ApiResponse } from "@/lib/https/http-response";
import { HttpStatus } from "@/lib/https/http-status";
import { Logger } from "@/lib/core/logger";
import { MealService } from "@/services/api/meal/meal.service";

MealService.init();

export async function GET(req: NextRequest) {
  try {
    const id = extractId(req);
    const meal = MealService.findById(id);

    if (!meal) {
      return ApiResponse.fail("Meal not found", HttpStatus.NOT_FOUND);
    }

    return ApiResponse.success(meal);
  } catch (error) {
    Logger.error("Error fetching meal:", error);
    return ApiResponse.fail(
      "Failed to fetch meal",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = extractId(req);
    const update = await req.json();
    const updatedMeal = MealService.updateById(id, update);

    if (!updatedMeal) {
      return ApiResponse.fail("Meal not found", HttpStatus.NOT_FOUND);
    }

    return ApiResponse.success(updatedMeal);
  } catch (error) {
    Logger.error("Error updating meal:", error);
    return ApiResponse.fail(
      "Failed to update meal",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = extractId(req);
    const deleted = MealService.deleteById(id);

    if (!deleted) {
      return ApiResponse.fail("Meal not found", HttpStatus.NOT_FOUND);
    }

    return ApiResponse.success({ success: true });
  } catch (error) {
    Logger.error("Error deleting meal:", error);
    return ApiResponse.fail(
      "Failed to delete meal",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

function extractId(req: NextRequest): number {
  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) throw new Error("ID not found in URL");
  return Number(id);
}
