export class SessionService {
  static generate(staffId: number): string {
    const random = Math.random().toString(36).slice(2, 10);
    const timestamp = Date.now();
    return `session-${staffId}-${random}-${timestamp}`;
  }

  static extractStaffId(sessionKey: string): number | null {
    const parts = sessionKey.split("-");
    const isValid = parts.length >= 3 && parts[0] === "session";
    const staffId = Number(parts[1]);
    return isValid && !isNaN(staffId) ? staffId : null;
  }
}
