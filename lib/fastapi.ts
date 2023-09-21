import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchListing(location: string) {
  const fetchSingleLocation = async (loc: string) => {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://zillow56.p.rapidapi.com/search',
      params: {
        location: loc.trim(),
      },
      headers: {
        'X-RapidAPI-Key': '54a781e945msh9fdfa5b7674aaf9p1a42a4jsnd8ba5888b639',
        'X-RapidAPI-Host': 'zillow56.p.rapidapi.com',
      },
    };
    try {
      const response: AxiosResponse = await axios.request(options);
      const data: ZillowData = response.data;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const locations = location.split(',');
  let aggregatedData: ZillowData = {
    results: [],
    resultsPerPage: 0,
    totalPages: 0,
    totalResultCount: 0,
  };

  for (const loc of locations) {
    const result = await fetchSingleLocation(loc);
    if (result && Array.isArray(result.results)) {
      aggregatedData.results = [...aggregatedData.results, ...result.results];
      aggregatedData.resultsPerPage += result.resultsPerPage;
      aggregatedData.totalPages += result.totalPages;
      aggregatedData.totalResultCount += result.totalResultCount;
    } else {
      console.warn('Unexpected data format:', result);
    }
    await delay(2000);
  }

  return aggregatedData;
}

export interface ListingSubType {
  is_FSBA: boolean;
}

export interface Results {
  bathrooms?: number;
  bedrooms?: number;
  city: string;
  country: string;
  currency: string;
  datePriceChanged?: number;
  daysOnZillow: number;
  homeStatus: string;
  homeStatusForHDP: string;
  homeType: string;
  imgSrc: string;
  isFeatured: boolean;
  isNonOwnerOccupied: boolean;
  isPreforeclosureAuction: boolean;
  isPremierBuilder: boolean;
  isShowcaseListing: boolean;
  isUnmappable: boolean;
  isZillowOwned: boolean;
  latitude: number;
  listing_sub_type: ListingSubType;
  livingArea: number;
  longitude: number;
  lotAreaUnit: string;
  lotAreaValue: number;
  price: number;
  priceChange?: number;
  priceForHDP: number;
  priceReduction?: string;
  rentZestimate: number;
  shouldHighlight: boolean;
  state: string;
  streetAddress: string;
  taxAssessedValue?: number;
  zestimate?: number;
  zipcode: string;
  zpid: number;
}

export interface ZillowData {
  results: Results[];
  resultsPerPage: number;
  totalPages: number;
  totalResultCount: number;
}
