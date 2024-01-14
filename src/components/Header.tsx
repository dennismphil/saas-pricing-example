import Link from "next/link";

export default function Header() {
  return (
    <header className="grid grid-cols-[1fr_auto] p-5 items-center">
      <h1 className="text-2xl">CloudyDev</h1>
      <nav className="grid gap-3 grid-flow-col">
        <Link href="/about">About</Link>
        <Link href="/#pricing">Pricing</Link>
      </nav>
    </header>
  );
}
