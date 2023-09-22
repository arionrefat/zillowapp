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
        'X-RapidAPI-Key': '91f66d2f09msh8dc35b159089680p104960jsn5d64660af0fb',
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
  zpid: string;
}

export interface ZillowData {
  results: Results[];
  resultsPerPage: number;
  totalPages: number;
  totalResultCount: number;
}

export async function fetchListingUrl(zpid: string) {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://zillow56.p.rapidapi.com/property',
    params: { zpid },
    headers: {
      'X-RapidAPI-Key': '980cabe76emshc7d103917336256p16007bjsnffec2c904bb7',
      'X-RapidAPI-Host': 'zillow56.p.rapidapi.com',
    },
  };
  try {
    const response: AxiosResponse = await axios.request(options);
    const data: string = response.data.hdpUrl;
    return data;
  } catch (error) {
    console.error(error);
  }
}
