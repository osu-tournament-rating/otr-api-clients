/** Configuration required for o!TR API Wrappers */
export interface IOtrApiWrapperConfiguration {
  /** The base URL of the API */
  baseUrl: string;

  /** Default headers to be included in every request */
  headers: HeadersInit;
}

export class OtrApiWrapperConfiguration implements IOtrApiWrapperConfiguration {
  public baseUrl: string;

  public headers: HeadersInit;

  constructor(baseUrl: string, headers?: HeadersInit) {
    this.baseUrl = baseUrl;
    this.headers = headers ?? {};
  }
}

export abstract class OtrApiWrapperBase {
  protected configuration: IOtrApiWrapperConfiguration;
  protected accessToken?: string;

  constructor(configuration: IOtrApiWrapperConfiguration) {
    this.configuration = configuration;
  }

  protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
    options.redirect = "follow";

    options.headers = {
      ...options.headers,
      ...this.configuration.headers
    };
    
    if (this.accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${this.accessToken}`
      };
    }

    return Promise.resolve(options);
  }

  protected getBaseUrl(..._: any[]): string { return this.configuration.baseUrl }

  /**
   * Set's the wrapper's current access token
   * @param accessToken Access token to set
   */
  public setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }
}