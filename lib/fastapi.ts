import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function fetchListing(location: string) {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://zillow56.p.rapidapi.com/search',
    params: {
      location,
    },
    headers: {
      'X-RapidAPI-Key': '46c297bf4dmshe49fe5ae83bc3c0p18e672jsn844834a3d6b5',
      'X-RapidAPI-Host': 'zillow56.p.rapidapi.com',
    },
  };
  try {
    const response: AxiosResponse = await axios.request(options);
    const data: ZillowData = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
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
