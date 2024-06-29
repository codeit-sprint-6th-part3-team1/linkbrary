import { useState } from 'react';

interface ApiResponse {
  success: boolean;
  data: any;
  error?: string;
}

const useApiReq = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const sendRequest = async (url: string, method: string, body?: any, token?: string): Promise<ApiResponse> => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(body),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'response is not ok');
      }

      return { success: true, data: responseData };
    } catch (err) {
      console.error(err);
      return { success: false, data: null, error: 'error' };
    }
  };

  return { loading, sendRequest };
};

export default useApiReq;
