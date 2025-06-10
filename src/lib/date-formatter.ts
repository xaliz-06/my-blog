export function formatRelativeDate(dateString: string | Date): string {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  // Calculate time differences
  if (seconds < intervals.minute) {
    return "just now";
  }

  if (seconds < intervals.hour) {
    const minutes = Math.floor(seconds / intervals.minute);
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  if (seconds < intervals.day) {
    const hours = Math.floor(seconds / intervals.hour);
    if (hours === 1) return "an hour ago";
    if (hours < 24) return `${hours} hours ago`;
  }

  // Check if it's today (but more than 24 hours)
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    const hours = Math.floor(seconds / intervals.hour);
    return `Today ${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  // Check for yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) return "yesterday";

  // Days ago (up to 7 days)
  if (seconds < intervals.week) {
    const days = Math.floor(seconds / intervals.day);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  // Weeks ago (up to 4 weeks)
  if (seconds < intervals.month) {
    const weeks = Math.floor(seconds / intervals.week);
    if (weeks === 1) return "a week ago";
    return `${weeks} weeks ago`;
  }

  // Months ago (up to 12 months)
  if (seconds < intervals.year) {
    const months = Math.floor(seconds / intervals.month);
    if (months === 1) return "last month";
    return `${months} months ago`;
  }

  // Years ago
  const years = Math.floor(seconds / intervals.year);
  if (years === 1) return "a year ago";
  return `${years} years ago`;
}
