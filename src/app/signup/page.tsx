'use client';

import { Pricing, fetchPricing } from "@/api/pricing/pricing";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import Header from "@/components/Header";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";


const REGEX_FIRST_NAME = /^[a-z A-Z]+$/; // Alphabets
const REGEX_CREDIT_CARD = /^\d{16}$/; // Numbers only with length 16
const REGEX_EMAIL = /^.+@.+[.].+$/; // combination of @, . and words
const REGEX_PASSWORD = /^.{6,}$/; // At-least 6 characters


export default function Signup() {
  const selectedPlanId = useSearchParams().get('plan') ?? '';

  const [pricingData, setPricingData] = useState<Pricing[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    creditCard: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({
    firstName: '',
    creditCard: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    const updatedError = {
      ...error
    };

    let isValid = true;

    if (REGEX_FIRST_NAME.test(form.firstName)) {
      updatedError.firstName = '';
    } else {
      isValid = false;
      updatedError.firstName = 'Please enter a valid first name with alphabets only';
    }

    if (REGEX_CREDIT_CARD.test(form.creditCard)) {
      updatedError.creditCard = '';
    } else {
      isValid = false;
      updatedError.creditCard = 'Please input a valid credit card number with 16 digits';
    }

    if (REGEX_EMAIL.test(form.email)) {
      updatedError.email = '';
    } else {
      isValid = false;
      updatedError.email = 'Please input a valid email address';
    }

    if (REGEX_PASSWORD.test(form.password)) {
      updatedError.password = '';
    } else {
      isValid = false;
      updatedError.password = 'Please input a password with at-least 6 characters';
    }

    if (form.password === form.confirmPassword) {
      updatedError.confirmPassword = '';
    } else {
      isValid = false;
      updatedError.confirmPassword = 'Passwords do not match';
    }

    setIsValid(isValid);
    setError(updatedError);

    return isValid;
  }

  const router = useRouter();
  // On load, fetch the pricing info
  useEffect(() => {
    fetchPricing(selectedPlanId)
      .then((matchingPlans) => {
        setPricingData(matchingPlans)
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedPlanId]);

  // On form change, clear the error state
  useEffect(() => {
    setIsValid(true);
    setError({
      firstName: '',
      creditCard: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  }, [form]);

  if (isLoading) return <p>Loading...</p>
  if (pricingData.length === 0) return <p>Invalid Plan</p>

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setForm({
      ...form,
      [fieldName]: fieldValue
    });
  }

  const handleSubmit = () => {
    if (validateForm()) {
      sessionStorage.setItem('firstName', form.firstName);
      sessionStorage.setItem('plan', JSON.stringify(pricingData[0]));
      router.push('/home');
    }
  }

  return (
    <div className="bg-yellow-50 min-h-screen grid grid-flow-col items-start justify-items-center h-fit">
      <div className="max-w-screen-xl w-full grid grid-rows-[max-content_1fr] min-h-fit">
        <Header />

        <section className="pricing-container max-w-4xl grid grid-flow-col grid-cols-[1.5fr_2fr] justify-self-center w-full rounded-3xl mt-10">
          <div className="left-col p-10 grid content-start gap-5 bg-white">
            <h1 className="text-2xl">
              <span>You are signing up for the </span>
              <span className="font-bold text-3xl">{`${pricingData[0].summary}`}</span>
              <span>. Great choice.</span>
            </h1>

            <span>Included:</span>
            <ul className="list-disc px-5">
              {
                pricingData[0].description.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))
              }
            </ul>
            <Button onClick={() => {router.push('/#pricing')}}>
              Change Plan
            </Button>
          </div>
          <form className="right-col p-5 bg-yellow-200">
            <FormInput
              id="input-first-name"
              name="firstName"
              label="First Name"
              labelClass="text-yellow-900"
              placeholder="John"
              value={form.firstName}
              isRequired={true}
              onChange={handleFieldChange}
              error={error.firstName}
            />
            <FormInput
              id="input-credit-card"
              name="creditCard"
              label="Credit Card"
              labelClass="text-yellow-900"
              placeholder="1234567099998888"
              isRequired={true}
              value={form.creditCard}
              onChange={handleFieldChange}
              error={error.creditCard}
            />
            <FormInput
              id="input-email"
              name="email"
              label="Email"
              labelClass="text-yellow-900"
              placeholder="john@acme-corp.com"
              isRequired={true}
              value={form.email}
              onChange={handleFieldChange}
              error={error.email}
            />
            <FormInput
              id="input-password"
              name="password"
              label="Password"
              labelClass="text-yellow-900"
              isRequired={true}
              type="password"
              value={form.password}
              onChange={handleFieldChange}
              error={error.password}
            />
            <FormInput
              id="input-confirm-password"
              name="confirmPassword"
              label="Confirm Password"
              labelClass="text-yellow-900"
              isRequired={true}
              type="password"
              value={form.confirmPassword}
              onChange={handleFieldChange}
              error={error.confirmPassword}
            />
            <div className="text-right">
              <Button onClick={handleSubmit}>Sign Up</Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
