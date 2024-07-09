export const getUpdatedAt = (date: string): string => {
  let userTime: string;

  const currentDate = new Date();
  const itemDate = new Date(date);
  const timeDiff = currentDate.getTime() - itemDate.getTime();

  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (hours > 0 && hours < 24) {
    userTime = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (hours >= 24) {
    userTime = `${days} day${days !== 1 ? 's' : ''} ago`;
  } else {
    userTime = `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }

  return userTime;
};
