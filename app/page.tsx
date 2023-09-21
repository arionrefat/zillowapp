import { LocationForm } from '@/components/FormInput';

export default function IndexPage() {
  return (
    <section className='container grid items-center gap-6 pb-8 pt-6 md:py-10'>
      <div className='flex max-w-[980px] flex-col items-start gap-2'>
        <h1 className='text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl'>
          Find Desired listings from Zillow
        </h1>
        <p className='max-w-[700px] text-lg text-muted-foreground'>
          Just put on the zip codes you want to search, and we will show you the
          best listings in the area.
        </p>
      </div>
      <div>
        <LocationForm />
      </div>
    </section>
  );
}
