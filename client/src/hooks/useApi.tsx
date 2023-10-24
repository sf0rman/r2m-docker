import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse {
  data: Record<string, unknown> | string;
  error?: string;
  status: number;
}

export default function useApi() {
  const [api, setApi] = useState({ baseUrl: "", headers: {} });
  const url: string = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (url) {
      setApi({
        baseUrl: url,
        headers: {
          "content-type": "application/json",
        },
      });
    }
  }, [url]);

  const post = async (path: string, data: object): Promise<ApiResponse> => {
    try {
      const res = await axios.post(`${api.baseUrl}/${path}`, data, {
        headers: api.headers,
        withCredentials: true,
      });
      console.log(res);
      return {
        data: res.data.data,
        error: res.data.error,
        status: res.status,
      };
    } catch (err) {
      return { status: 0, data: { error: "Unknown error" } };
    }
  };

  return {
    post,
  };
}
