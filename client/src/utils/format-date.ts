import {
  format,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

export const formatDate = (date: Date) => {
  const now = new Date();
  const secondsDiff = differenceInSeconds(now, date);
  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);
  const daysDiff = differenceInDays(now, date);

  if (secondsDiff < 60) {
    return secondsDiff === 1 ? "1 sec ago" : `${secondsDiff} secs ago`;
  } else if (minutesDiff < 60) {
    return minutesDiff === 1 ? "1 min ago" : `${minutesDiff} mins ago`;
  } else if (hoursDiff < 24) {
    return hoursDiff === 1 ? "1 hr ago" : `${hoursDiff} hrs ago`;
  } else if (daysDiff <= 3) {
    return daysDiff === 1 ? "1 day ago" : `${daysDiff} days ago`;
  } else {
    return format(date, "MMMM dd, yyyy");
  }
};

/**

// Example Usage:
const date1 = new Date(); // current time
const date2 = new Date("2024-11-20T10:30:00"); // example time: 2 days ago
const date3 = new Date("2024-11-22T08:00:00"); // example time: 2 hours ago
const date4 = new Date("2024-11-22T07:45:00"); // example time: 15 minutes ago

console.log(formatDate(date1)); // e.g., "0 mins ago"
console.log(formatDate(date2)); // e.g., "2 days ago"
console.log(formatDate(date3)); // e.g., "2 hrs ago"
console.log(formatDate(date4)); // e.g., "15 mins ago"
*/
