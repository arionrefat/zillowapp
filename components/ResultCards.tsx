import * as React from 'react';

import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { fetchListingUrl } from '@/lib/fastapi';

type ListingProps = {
  streetAddress: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  imgSrc: string;
  zpid: string;
};

export function ResultCards(props: ListingProps) {
  return (
    <Card
      className='w-[350px] rounded-lg shadow-lg overflow-hidden cursor-pointer'
      onClick={async () => {
        const fetchedResult = await fetchListingUrl(props.zpid);
        window.open(`https://www.zillow.com/${fetchedResult}`, '_blank');
      }}
    >
      <CardHeader className='p-4'>
        <CardTitle className='text-2xl font-bold'>
          {props.streetAddress}
        </CardTitle>
      </CardHeader>
      <div className='relative'>
        <Image
          src={props.imgSrc}
          alt='Listing Image'
          width={700}
          height={400}
          className='w-full h-48 object-cover'
        />
        <div className='absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black text-white'>
          <span className='text-lg font-semibold'>${props.price}</span>
        </div>
      </div>
      <CardContent className='p-4'>
        <div className='mb-3'>
          <Label className='font-medium text-gray-600'>{props.city}</Label>
          <div>
            {props.city}, {props.state}
          </div>
        </div>
        <div className='mb-3'>
          <Label className='font-medium text-gray-600'>
            Bedrooms & Bathrooms
          </Label>

          <div>
            {props.bedrooms} Beds, {props.bathrooms} Baths
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
