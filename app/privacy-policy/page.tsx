import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Aurasyncs',
  description: 'Read the Privacy Policy for Aurasyncs.',
  // Prevent search engines from indexing placeholder pages (remove later)
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="reader-scroll">
      <header className="article-head">
        <span className="eyebrow">Legal</span>
        <h1 className="article-title">Privacy Policy</h1>
        <p className="article-sub">
          How we collect, use, and safeguard your information.
        </p>
      </header>

      <div className="prose-body">
        <p>
          <em>Last Updated: 03/05/2025</em>
        </p>
        <p>
          Welcome to Aurasyncs! This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our
          website [Your Website URL] and use our services. Please read this
          privacy policy carefully. If you do not agree with the terms of this
          privacy policy, please do not access the site.
        </p>
        <h2>Collection of Your Information</h2>
        <p>
          We may collect information about you in a variety of ways. The
          information we may collect on the Site includes... [Add details about
          data collected, e.g., personal data, derivative data, financial data,
          etc.]
        </p>
        <h2>Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a
          smooth, efficient, and customized experience. Specifically, we may use
          information collected about you via the Site to... [Add details about
          how data is used, e.g., create account, process payments, email you,
          etc.]
        </p>
        <h2>Disclosure of Your Information</h2>
        <p>
          We may share information we have collected about you in certain
          situations... [Add details about data sharing, e.g., by law,
          third-party service providers, business transfers, etc.]
        </p>
        {/* Add more sections as needed: Security, Cookies, Policy for Children, Contact Us, etc. */}
        <p>
          [Placeholder for more detailed privacy policy content. You should
          consult with a legal professional to draft a comprehensive policy.]
        </p>
      </div>
    </div>
  );
}
