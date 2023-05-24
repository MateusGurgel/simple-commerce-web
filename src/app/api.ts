import axios, { AxiosResponse, AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error((error as AxiosError).message);
    }
    throw new Error("An error occurred");
  }
};

export { api, fetcher };
