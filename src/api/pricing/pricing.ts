export interface Pricing {
  // Unique identifier for the pricing plan
  id: string;

  // One liner summary of package
  summary: string;

  // '$'
  currency: string;

  // Price
  amount: number;

  unit: 'hour' | 'month' | 'sprint';

  // Array of detailed description of what you get
  description: string[];
}

import pricingData from './pricing.json';
import { sleep } from '@/utils/utils';

/**
 * API to fetch pricing details
 * @param id Optionally a pricing id can be provided to return only details of that plan
 * @returns Array of Pricing Details
 */
export async function fetchPricing(id?: string): Promise<Pricing[]> {
  // Simulate a network delay
  await sleep(300);

  const response = pricingData as Pricing[];

  if (!id) {
    // Return all
    return response;
  }

  return response.filter((response) => response.id === id);
}
