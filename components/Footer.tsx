import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-foot">
      <span>&copy; {currentYear} Aurasyncs. All rights reserved.</span>
      <span className="foot-links">
        <Link href="/privacy-policy" prefetch={false}>Privacy Policy</Link>
        <Link href="/terms-of-service" prefetch={false}>Terms of Service</Link>
      </span>
    </footer>
  );
}
