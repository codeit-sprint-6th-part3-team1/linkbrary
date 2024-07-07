// url 경로 내 placeholder를 실제 값으로 변경
export const replacePlaceholder = (url: string, placeholder: { [key: string]: string | number | undefined }) => {
  let updatedUrl = url;
  for (const key in placeholder) {
    if (placeholder.hasOwnProperty(key)) {
      const value = placeholder[key];
      if (value !== undefined) updatedUrl = updatedUrl.replace(`{${key}}`, value.toString());
    }
  }
  return updatedUrl;
};

// url에 query parameter 추가
export const addQueryParams = (url: string, queryParams: { [key: string]: string | number | undefined }) => {
  const urlObj = new URL(url, process.env.NEXT_PUBLIC_API_ROOT_URL);
  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];
    if (value !== undefined) {
      urlObj.searchParams.append(key, value.toString());
    }
  });
  return urlObj.toString();
};
