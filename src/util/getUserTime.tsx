export const getUpdatedAt = (date: string): string => {
  let userTime: number | string;
  const currentDate = new Date();
  const itemDate = new Date(date);
  const timeDiff = currentDate.getTime() - itemDate.getTime();
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0 && hours < 24) {
    userTime = `${hours} hours ago`;
  } else if (hours >= 24) {
    const day = Math.floor(hours / 24);
    userTime = `${day} days ago`;
  } else {
    userTime = `${minutes} minutes ago`;
  }
  return userTime;
};
