import { HTTP_METHOD } from '@/constants/http.constants';
import { SETTINGS } from '@/constants/settings.constants';

const formatDataJson = (data: object) => {
  if (data !== null && typeof data === 'object') {
    return JSON.stringify(data);
  }
  return undefined;
};

export const formatRequestURL = (url?: string): string => {
  const key = import.meta.env.VITE_ENVIRONMENT;
  if (key === 'DEV') {
    return `${SETTINGS.URL.ENVIRONMENT.DEV}${url}`;
  } else {
    return `${SETTINGS.URL.ENVIRONMENT.PROD}${url}`;
  }
};
export const $httpPost = (requestURL: string, requestData: any) => {
  return fetch(formatRequestURL(requestURL), {
    body: formatDataJson(requestData),
    headers: {
      'Content-Type': 'application/json',
    },
    method: HTTP_METHOD.POST,
  });
};

export const $httpPatch = (requestURL: string, requestData: any) => {
  return fetch(formatRequestURL(requestURL), {
    body: formatDataJson(requestData),
    headers: {
      'Content-Type': 'application/json',
    },
    method: HTTP_METHOD.PATCH,
  });
};
export const $httpGet = (requestUrl: string, options?: RequestInit) => {
  return fetch(formatRequestURL(requestUrl), {
    method: HTTP_METHOD.GET,
    ...(options || {}),
  });
};

export const $httpDelete = (requestUrl: string, options?: RequestInit) => {
  return fetch(formatRequestURL(requestUrl), {
    method: HTTP_METHOD.DELETE,
    ...(options || {}),
  });
};
