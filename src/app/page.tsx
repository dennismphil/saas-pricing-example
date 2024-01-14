'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import PricingCard from '@/components/PricingCard';
import {fetchPricing, type Pricing} from '@/api/pricing/pricing';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  const [pricingData, setPricingData] = useState<Pricing[]>([]);

  useEffect(() => {
    // Fetch data on mount
    fetchPricing()
      .then(setPricingData)
  }, []);

  return (
    <div className="grid place-items-center bg-yellow-50">
      <div className="max-w-screen-xl w-full grid">

       <Header />

        <main className="grid">
          {/* Hero Section 1 */}
          <section className="grid py-40 px-10">
            <h1 className="text-3xl font-semibold pb-3">Ship your application in weeks, not years</h1>
            <div className="max-w-prose">
              Have a hard deadline to meet? Wish there was a dream team that makes things happen like magic?
              We are a team of seasoned professionals that understands the business, quick to act and no fluff.
            </div>

            <Button className="max-w-max mt-5" onClick={() => {}}>
              <Link href="#pricing">See Pricing</Link>
            </Button>
          </section>

          {/* Hero Section 2 */}
          <section className="grid py-40 px-10 bg-white">
            <h1 className="text-3xl font-semibold pb-3">Crunch Time?</h1>
            <div className="max-w-prose">
              We help early stage startups, the mighty Fortune 500s, Solo developers and more.
            </div>
            <div className="grid grid-flow-col items-center auto-cols-max gap-10 py-3">
              {
                ["hash", "ig", "medium", "snap", "twitter"].map((icon, index) => {
                  return (
                    <Image
                      src={`/icon-${icon}.svg`}
                      alt={`client logo ${index}`}
                      key={icon}
                      width={48}
                      height={48}
                    />
                  );
                })
              }
            </div>
          </section>

          {/* Hero Section 3 */}
          <section className="grid py-40 px-10 bg-yellow-50" id="pricing">
            <h1 className="text-3xl font-semibold pb-5">Upfront Pricing with no hidden charges</h1>
            <div className="card-list grid grid-flow-col gap-4">
              {
                pricingData.map((item) => {
                  return (
                    <PricingCard
                      key={item.id}
                      id={item.id}
                      summary={item.summary}
                      amount={item.amount}
                      currency={item.currency}
                      description={item.description}
                      unit={item.unit}
                    />
                  )
                })
              }
            </div>
          </section>
        </main>
        </div>
    </div>
  )
}
