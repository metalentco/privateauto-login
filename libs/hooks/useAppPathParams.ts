import { useRouter } from "next/router";
import { useMemo } from "react";

export function useAuthParams() {
  const router = useRouter();
  return useMemo(() => {
    if (router.query.isCreateListing) {
      return `/listing/steps?${new URLSearchParams(router.query as any)}`;
    }
    if (router.query.isCreateListing) {
      return "/listing/";
    }
    if (router.query.isListingAction) {
      return `/listing/${router.query.isListingAction}`;
    }
    if (router.query.isFastTrackDeal) {
      return `/deal-now/${router.query.isFastTrackDeal}`;
    }
    if (router.query.isFastTrackDealStart) {
      return `/deals?dealNowStart=${router.query.isFastTrackDealStart}`;
    }
    if (router.query.isFavMark) {
      return `/listing/${router.query.isFavMark}`;
    }
    if (router.query.isVehicleHistory) {
      return `/listing/${router.query.isVehicleHistory}`;
    }
    if (router.query.isLoanAction) {
      return `/listing/${router.query.isLoanAction}`;
    }
    return "/search-listings";
  }, [router.query]);
}

export function parseUrlWithPathParams(baseUrl: string, pathParams: string) {
  if (pathParams) {
    return baseUrl.endsWith("/")
      ? `${baseUrl.slice(0, -1)}${pathParams}`
      : `${baseUrl}${pathParams}`;
  }
  return baseUrl;
}
