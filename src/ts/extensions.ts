import { AxiosInstance } from 'axios'; // ignore
import { CreateAxiosDefaults } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    /**
     * Denotes if the route requires authorization to access
     */
    requiresAuthorization?: boolean;
  }
}

/** Configuration required for o!TR API Wrappers */
export interface IOtrApiWrapperConfiguration {
  /** The base URL of the API */
  baseUrl: string;

  /** Defaults used to created the inner axios client */
  clientConfiguration?: CreateAxiosDefaults;

  /** Function to configure the inner axios client after creation . Called during creation of the wrapper */
  postConfigureClientMethod?: (instance: AxiosInstance) => void;
}

const defaultAxiosClientConfiguration: CreateAxiosDefaults = {
  transitional: {
    forcedJSONParsing: false,
    silentJSONParsing: false,
  },
};

/** Default configuration used to create wrapper instances */
export const defaults: IOtrApiWrapperConfiguration = {
  baseUrl: 'https://otr.stagec.xyz',

  clientConfiguration: defaultAxiosClientConfiguration,

  postConfigureClientMethod: undefined,
};

export abstract class OtrApiWrapperBase {
  protected configuration: IOtrApiWrapperConfiguration;

  constructor(configuration?: IOtrApiWrapperConfiguration) {
    configuration ??= defaults;
    this.configuration = configuration;
    this.configuration.clientConfiguration = {
      ...defaultAxiosClientConfiguration,
      ...this.configuration.clientConfiguration,
    };
  }

  protected getBaseUrl(..._: any[]): string {
    return this.configuration.baseUrl;
  }

  /**
   * Exposes the underlying axios client for configuration
   */
  public async configureClient(
    configure: (instance: AxiosInstance) => Promise<void> | void
  ): Promise<void> {
    // @ts-expect-error
    return await configure(this.instance);
  }
}
