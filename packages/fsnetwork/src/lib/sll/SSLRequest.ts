import { fetch, ReactNativeSSLPinning } from 'react-native-ssl-pinning';
import { FSNetworkRequestConfig } from '../interfaces';
import { SSLResponse } from './SSLResponse';
import { SSLError } from './SSLError';

type SSLMethods = SSLMethodType;

export enum SSLMethodType {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE'
}

export class SSLRequest {

  private readonly baseRequestOptions: ReactNativeSSLPinning.Options;

  constructor(certificates: string[]) {
    console.log('CERTIFICATES: ', certificates);
    if (!certificates) {
      throw new Error('Certificates paths are required for SLL Pinning requests');
    }
    this.baseRequestOptions = {
      sslPinning: {
        certs: certificates
      }
    };
  }

  async send<T = any>(
    config: FSNetworkRequestConfig,
    method?: SSLMethods,
    body?: any
  ): Promise<any> {
    if (!config.url) {
      throw new Error('URL is required');
    }
    const jsonBody = JSON.stringify(body);
    try {
      const fetchThis = await fetch(config.baseURL + config.url, {
        ...this.baseRequestOptions,
        ...this.parseConfigToOptions(config, method),
        method,
        body: jsonBody
      });

      console.log('FETCH THIS: ', fetchThis);

      return new SSLResponse(fetchThis, config);
    } catch (e) {
      return new SSLError(e, config);
    }
  }

  private parseConfigToOptions = (config: FSNetworkRequestConfig, method?: SSLMethods)
  : Partial<ReactNativeSSLPinning.Options> => {
    let headers: ReactNativeSSLPinning.Header;
    if (method && config.headers[method.toLowerCase()]) {
      headers = config.headers[method.toLowerCase()];
    } else {
      headers = config.headers;
    }
    // console.log('HEADERS', config.headers);
    return {
      headers: {
        ...headers,
        'Content-Type': 'application/json;charset=UTF-8'
      },
      timeoutInterval: config.timeout
    };
  }
}
