import {forEach, isArray, isDate, isObject} from 'lodash-es';

const isURLSearchParams = (val: any) => {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

const encode = (val: string) => {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

const serialize = (parts: string[]) => (value: any, key: any) => {
  console.log('PARAMS IN LOOP: ', value)
  if (!value) {
    return;
  }

  if (isArray(value)) {
    key = key + '[]';
  } else {
    value = [value];
  }

  forEach(value, parseValue(parts, key));
};

const parseValue = (parts: string[], key: any) => (value: any) => {
  if (isDate(value)) {
    value = value.toISOString();
  } else if (isObject(value)) {
    value = JSON.stringify(value);
  }
  parts.push(encode(key) + '=' + encode(value));
  console.log('PARTS:', parts);
}

export const buildURL = (
  url: string,
  params: any,
  paramsSerializer?: (params: any) => string
) => {
  console.log('PARAMS TO BUILD: ', params);
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  const parts: string[] = [];

  let serializedParams;
  if (paramsSerializer) {
    console.log('PARAMS TO HERE21', params);
    serializedParams = paramsSerializer(params);
  } else if (isURLSearchParams(params)) {
    console.log('PARAMS TO HERE2', params);
    serializedParams = params.toString();
  } else {
    console.log('PARAMS TO HERE1', params);
    forEach(params, serialize(parts));
    console.log('PARAMS TO PARTS: ', parts);
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  console.log('PARAMS BUILD URL: ', url);
  return url;
};

