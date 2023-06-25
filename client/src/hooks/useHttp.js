import { useCallback, useState } from "react";
function useRequestHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // hàm request api
  const sendRequest = useCallback(async (http, applyData) => {
    try {
      setIsLoading(true);
      const reponse = await fetch(`http://localhost:5000${http.url}`, {
        method: http.method ? http.method : "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: http.dataBody ? JSON.stringify(http.dataBody) : null,
      });
      if (!reponse.ok) {
        throw new Error("Error");
      }
      const data = await reponse.json();
      // hàm kiểm tra và truyền dữ liệu
      applyData(data);
      setError(false);
    } catch (err) {
      setError(true);
      console.error(error);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
}

export default useRequestHttp;
