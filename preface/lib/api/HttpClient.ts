import axios, { AxiosInstance } from "axios";

interface HttpClient {
  readonly instance: AxiosInstance;
}

export abstract class HttpClientImpl implements HttpClient {
  readonly instance: AxiosInstance;

  // TODO: 에러처리

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL: baseURL
    });
  }
}
