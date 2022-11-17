import axios, { AxiosInstance } from "axios";

interface HttpClient {
  readonly instance: AxiosInstance;
}

export abstract class HttpClientImpl implements HttpClient {
  readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL: baseURL
    });
  }
}
