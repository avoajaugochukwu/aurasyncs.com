import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Aurasyncs collects, uses, and safeguards your information — including analytics, cookies, and your choices.',
  alternates: { canonical: '/privacy-policy' },
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

      <div className="doc-body">
        <p>
          <em>Last updated: June 9, 2026</em>
        </p>
        <p>
          This Privacy Policy explains how Aurasyncs (&quot;we&quot;, &quot;us&quot;,
          or &quot;our&quot;) collects, uses, and protects your information when you
          visit aurasyncs.com (the &quot;Site&quot;). Aurasyncs is a reading site for
          daily affirmations. By using the Site, you agree to the practices
          described here.
        </p>

        <h2>Information we collect</h2>
        <p>
          We keep data collection to a minimum. You can read every affirmation on
          the Site without creating an account or giving us any personal details.
          The information we do collect falls into two groups:
        </p>
        <ul>
          <li>
            <strong>Usage data.</strong> Like most websites, we use analytics to
            understand which pages are read and how the Site performs — for
            example, pages visited, approximate location (country or region),
            device and browser type, and referring links. This data is
            aggregated and is not used to identify you personally.
          </li>
          <li>
            <strong>Information you choose to give us.</strong> If you contact us
            by email, we receive your email address and whatever you include in
            your message, solely to respond to you.
          </li>
        </ul>

        <h2>Cookies and analytics</h2>
        <p>
          We use Google Analytics to measure traffic and improve the Site. It sets
          cookies and collects the usage data described above on our behalf. Your
          theme preference (Sand or Dusk) is stored locally in your browser and is
          never sent to us. You can block or delete cookies in your browser
          settings; the Site will still work, though some preferences may not be
          remembered.
        </p>

        <h2>How we use your information</h2>
        <p>
          We use the limited information we collect to operate and improve the
          Site, understand which affirmation collections are most helpful, keep
          the Site secure, and respond to messages you send us. We do not sell
          your personal information, and we do not use it to build advertising
          profiles.
        </p>

        <h2>How we share information</h2>
        <p>
          We share information only with the service providers that help us run
          the Site (such as our analytics and hosting providers), and only as
          needed for them to provide their service. We may also disclose
          information if required by law or to protect the rights and safety of
          our users and the Site. We do not otherwise share your information with
          third parties.
        </p>

        <h2>Your choices</h2>
        <p>
          You can opt out of Google Analytics using Google&apos;s browser
          add-on, clear or block cookies in your browser, and email us to ask what
          information we hold about you or to request its deletion. Depending on
          where you live, you may have additional rights over your data under laws
          such as the GDPR or CCPA, and we will honor valid requests.
        </p>

        <h2>Children&apos;s privacy</h2>
        <p>
          Aurasyncs is intended for a general audience and is not directed to
          children under 13. We do not knowingly collect personal information from
          children. If you believe a child has provided us information, please
          contact us and we will delete it.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will
          revise the &quot;Last updated&quot; date above. Significant changes will
          be reflected on this page.
        </p>

        <h2>Contact us</h2>
        <p>
          If you have any questions about this Privacy Policy or how your
          information is handled, email us at{' '}
          <a href="mailto:hello@aurasyncs.com">hello@aurasyncs.com</a>.
        </p>
      </div>
    </div>
  );
}
