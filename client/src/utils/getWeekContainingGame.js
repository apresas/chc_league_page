// Utility function to determine default week selection
import { getWeekContainingDate } from "./getWeekContainingDate";

export function getInitialWeekFromGames(gameDates) {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  if (gameDates.includes(todayStr)) {
    return getWeekContainingDate(today.getFullYear(), today.getMonth(), today.getDate());
  }

  const sorted = gameDates
    .map(date => new Date(date))
    .sort((a, b) => Math.abs(a - today) - Math.abs(b - today));

  if (sorted.length > 0) {
    const closest = sorted[0];
    return getWeekContainingDate(closest.getFullYear(), closest.getMonth(), closest.getDate());
  }

  return getWeekContainingDate(today.getFullYear(), today.getMonth(), today.getDate());
}