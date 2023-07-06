import { useRouter } from 'next/router';
import { useMemo } from 'react';

export function useAuthParams() {
  const router = useRouter();
  return useMemo(() => {
    if (router.query.isCreateListing) {
      return `/listing/steps?${new URLSearchParams(router.query as any)}`;
    }
    if (router.query.isCreateListing) {
      return '/listing/';
    }
    if (router.query.isListingAction) {
      return `/listing/${router.query.isListingAction}`;
    }
    return '';
  }, [router.query]);
}

export function parseUrlWithPathParams(baseUrl: string, pathParams: string) {
  if (pathParams) {
    const result = baseUrl.endsWith('/')
      ? `${baseUrl.slice(0, -1)}${pathParams}`
      : `${baseUrl}${pathParams}`;
    console.log('result: ', result);
    return result;
  }
  return baseUrl;
}
