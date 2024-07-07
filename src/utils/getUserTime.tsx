export const getUpdatedAt = (date: string): string => {
<<<<<<< HEAD
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

=======
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
>>>>>>> a246fcbaf6d9013f2ef70341543812f83b4e5a56
  return userTime;
};
