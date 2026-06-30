/**
 * Calendar helpers for the countdown section.
 * The grid is Monday-first to match Vietnamese calendars (T2 → CN).
 */

/**
 * Build a Monday-first month grid.
 *
 * @param year        full year, e.g. 2026
 * @param month1Indexed  1-indexed month (1 = Jan … 12 = Dec)
 * @returns rows of 7 cells; each cell is the day-of-month or `null` for padding
 */
export function buildMonthMatrix(
  year: number,
  month1Indexed: number,
): (number | null)[][] {
  const month = month1Indexed - 1; // Date uses 0-indexed months
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // JS getDay(): 0 = Sunday … 6 = Saturday. Shift so Monday = 0 … Sunday = 6.
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }
  return rows;
}
