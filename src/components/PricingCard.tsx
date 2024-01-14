/**
 * UI Component displaying individual pricing card
 * showing summary of the package price, and the details
 */

import Button from "./Button";
import { useRouter } from 'next/navigation';

interface PricingCardProps {
  // Unique Plan identifier
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

export default function PricingCard({
  id,
  summary,
  currency = '$',
  amount = 0,
  unit = 'hour',
  description = [],
}: PricingCardProps) {
  const router = useRouter();

  if (!summary) {
    // Do not render the card if the summary is empty
    return null;
  }

  const handleClick = (id: string) => {
    router.push(`/signup?plan=${id}`);
  }

  return (
    <div className="card border p-5 border-yellow-400 rounded-lg">
        <div className="card-title pb-5">
          {summary}
        </div>
        <div className="card-pricing pb-5">
          <span className="text-3xl">{currency}{amount}</span>
          <span className="text-lg">/{unit}</span>
        </div>

        <Button onClick={() => handleClick(id)}>
          Book Consultation
        </Button>

        <ul className="card-description p-5">
          {
            description.map((sentence, index) => {
              return (
                <li key={`sentence-${index}`} className="list-disc pb-2">
                  {sentence}
                </li>
              )
            })
          }
        </ul>
    </div>
  );
}
