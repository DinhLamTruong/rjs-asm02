import { useState, useCallback } from 'react';

const useHttp = () => {
  // state lưu error
  const [error, setError] = useState();

  // hàm fetch data api với tham số 1 object chứa url, 1 funtion
  // function được gọi nhận lại data api
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!response.ok) {
        throw Error(' failed!');
      }
      const data = await response.json();
      applyData(data);
    } catch (error) {
      setError(error.message || 'Something went wrong!');
    }
  }, []);

  return {
    error,
    sendRequest,
  };
};

export default useHttp;
