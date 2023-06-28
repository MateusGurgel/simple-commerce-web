import axios, { AxiosResponse, AxiosError } from "axios";
import { endPoint } from "./constants";

const api = axios.create({
  baseURL: endPoint,
});

function setApiToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

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

export { api, fetcher, setApiToken };
