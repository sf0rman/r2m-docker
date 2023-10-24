import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function useApi() {
  const [api, setApi] = useState({
    baseUrl: import.meta.env.VITE_API_URL,
    headers: {},
  });

  useEffect(() => {
    if (import.meta.env.VITE_API_URL) {
      setApi({
        baseUrl: import.meta.env.VITE_API_URL,
        headers: {
          "content-type": "application/json",
        },
      });
    }
  }, [import.meta.env.VITE_API_URL]);

  const get = async (path: string, pathParams?: URLSearchParams) => {
    try {
      const res = await axios.get(`${api.baseUrl}/${path}`, {
        headers: api.headers,
        withCredentials: true,
      });

      return {
        data: res.data,
        status: res.status,
      };
    } catch (err) {
      if (err instanceof AxiosError) {
        return { status: err.response?.status, data: { error: err.response } };
      }
      return { status: 0, data: { error: "Unknown error" } };
    }
  };

  const post = async (path: string, data: Record<string, any>) => {
    try {
      const res = await axios.post(`${api.baseUrl}/${path}`, data, {
        headers: api.headers,
        withCredentials: true,
      });
      return {
        data: res.data.data,
        error: res.data.error,
        status: res.status,
      };
    } catch (err) {
      if (err instanceof AxiosError) {
        return { status: err.response?.status, data: { error: err.response } };
      }
      return { status: 0, data: { error: "Unknown error" } };
    }
  };

  return {
    get,
    post,
  };
}
