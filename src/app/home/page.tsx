'use client';

import type { Pricing } from "@/api/pricing/pricing";
import { useRouter } from "next/navigation";
const pages = ['Home', 'Profile', 'Billing'];

export default function Home() {
  let firstName = window?.sessionStorage?.getItem('firstName');
  let planStr = window?.sessionStorage?.getItem('plan');

  let plan: null | Pricing = null;
  const router = useRouter();

  if (!planStr || !firstName) {
    // Unauthorized, redirect to home page
    return router.push('/');
  }

  try {
    plan = JSON.parse(planStr);
  } catch (err) {
    console.error(err);
  }

  if (!plan) {
    // Unauthorized, redirect to home page
    return router.push('/');
  }

  const handleSignOut = () => {
    sessionStorage?.clear();
    router.push('/');
  }

  const navigateTo = (page: string) => {
    router.push(`/${page.toLowerCase()}`);
  };

  return (
    <div className="grid grid-flow-col grid-cols-[200px_1fr] w-full min-h-screen ">
      <aside className="bg-lime-200 grid content-start grid-rows-[max-content_1fr_max-content]">
        <h1 className="text-2xl p-5 text-center font-thin">CloudyDev</h1>
        <nav>
          <ul className="text-lime-900">
            {
              pages.map((page) => (
                <li className="text-center p-4 font-semibold hover:bg-lime-100 cursor-pointer uppercase" key={page} onClick={() => navigateTo(page)}>
                  {page}
                </li>
              ))
            }
          </ul>
        </nav>
        <a
          className="py-5 text-center text-lime-900 hover:bg-lime-100 cursor-pointer uppercase"
          href="#"
          onClick={handleSignOut}
        >
          Sign Out
        </a>
      </aside>
      <main className="text-3xl p-10 bg-lime-50">
        Welcome {firstName}, You are on the {plan.summary} plan.


      </main>
    </div>
  );
}
