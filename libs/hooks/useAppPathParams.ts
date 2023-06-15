import { useRouter } from "next/router";
import { useMemo } from "react";

export function useAuthParams() {
  const router = useRouter()
  return useMemo(() => {
    if(router.query.isCreateListing) {
      return `/listing/steps?${new URLSearchParams(router.query as any)}`
    }
    return ''
  }, [router.query])
}

export function parseUrlWithPathParams(baseUrl: string, pathParams: string) {
  if(pathParams) {
    return baseUrl.endsWith('/') ? `${baseUrl.slice(0, -1)}${pathParams}` : `${baseUrl}${pathParams}`
  }
  return baseUrl
}