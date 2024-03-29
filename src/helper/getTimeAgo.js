export function getTimeAgo(timestamp) {
  const now = new Date();
  const previous = new Date(timestamp);
  const diff = now - previous;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months >= 1) {
    return `${months === 1 ? "one month" : `${months} months`} ago`;
  } else if (days >= 1) {
    return `${days === 1 ? "one day" : `${days} days`} ago`;
  } else if (hours >= 1) {
    return `${hours === 1 ? "one hour" : `${hours} hours`} ago`;
  } else if (minutes >= 1) {
    return `${minutes === 1 ? "one minute" : `${minutes} minutes`} ago`;
  } else {
    return "just now";
  }
}
