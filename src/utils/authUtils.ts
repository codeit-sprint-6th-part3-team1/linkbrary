export const checkAccessToken = (accessToken: string | null, setMessage: (message: string) => void): string | null => {
  if (!accessToken) {
    setMessage('Token error');
    return null;
  }
  return accessToken;
};
