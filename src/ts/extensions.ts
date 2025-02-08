import { AxiosInstance } from "axios"; // ignore
import { CreateAxiosDefaults } from "axios";

/** Configuration required for o!TR API Wrappers */
export interface IOtrApiWrapperConfiguration {
  /** The base URL of the API */
  baseUrl: string;

  /** Defaults used to created the inner axios client */
  clientConfiguration?: CreateAxiosDefaults;

  /** Function to configure the inner axios client after creation . Called during creation of the wrapper */
  postConfigureClientMethod?: (instance: AxiosInstance) => void;
}

export abstract class OtrApiWrapperBase {
  protected configuration: IOtrApiWrapperConfiguration;

  constructor(configuration: IOtrApiWrapperConfiguration) {
    this.configuration = configuration;
    this.configuration.clientConfiguration = { 
      transitional: {
        forcedJSONParsing: false,
        silentJSONParsing: false
      }, 
      ...this.configuration.clientConfiguration 
    };
  }

  protected getBaseUrl(..._: any[]): string { return this.configuration.baseUrl }
}