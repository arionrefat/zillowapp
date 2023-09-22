'use client';

import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Results, fetchListing } from '@/lib/fastapi';
import { ResultCards } from './ResultCards';
import { useState } from 'react';

const formSchema = z.object({
  address: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export function LocationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
    },
  });

  const [result, setResult] = useState<Results[] | undefined>();

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true); // Start loading
    const fetchedResult = await fetchListing(values.address);
    const filteredResult = fetchedResult?.results.filter((work: Results) => {
      return work.daysOnZillow > 90;
    });
    setResult(filteredResult);
    console.log(filteredResult);
    setLoading(false); // End loading
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your desired ZipCode</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your ZipCode' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Submit
          </Button>
        </form>
      </Form>
      <div className='grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-3 pt-10'>
        {result !== undefined &&
          result.map((work: Results, index: number) => (
            <ResultCards
              key={index}
              streetAddress={work.streetAddress}
              city={work.city}
              state={work.state}
              bedrooms={work.bedrooms as number}
              bathrooms={work.bathrooms as number}
              price={work.price}
              imgSrc={work.imgSrc}
              zpid={work.zpid}
            />
          ))}
        {result?.length === 0 && (
          <h1>No properties are available with the given criteria</h1>
        )}
      </div>
    </div>
  );
}
