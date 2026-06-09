import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="site-head">
      <Link className="brand" href="/">
        <span className="mark" aria-hidden="true" />
        Aurasyncs
      </Link>
      <nav className="site-nav" aria-label="Primary">
        <Link href="/">Home</Link>
        <Link href="/daily">Daily</Link>
        <Link href="/blog">Blog</Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
