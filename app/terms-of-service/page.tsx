import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of Aurasyncs — including acceptable use, our content, disclaimers, and contact details.',
  alternates: { canonical: '/terms-of-service' },
};

export default function TermsOfServicePage() {
  return (
    <div className="reader-scroll">
      <header className="article-head">
        <span className="eyebrow">Legal</span>
        <h1 className="article-title">Terms of Service</h1>
        <p className="article-sub">The terms that govern your use of Aurasyncs.</p>
      </header>

      <div className="doc-body">
        <p>
          <em>Last updated: June 9, 2026</em>
        </p>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of
          aurasyncs.com (the &quot;Site&quot;), operated by Aurasyncs
          (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing or
          using the Site, you agree to these Terms. If you do not agree, please do
          not use the Site.
        </p>

        <h2>Using the Site</h2>
        <p>
          Aurasyncs is a free reading site for daily affirmations. You may read,
          copy individual affirmations, and share them for your own personal,
          non-commercial use. You agree not to misuse the Site — for example, by
          attempting to disrupt it, scrape it at scale, or republish our
          collections wholesale as your own.
        </p>

        <h2>Not medical or professional advice</h2>
        <p>
          Affirmations on Aurasyncs are offered for reflection and encouragement.
          They are a supportive practice, not a substitute for professional
          medical, psychological, or financial advice, diagnosis, or treatment. If
          you are struggling with your mental health or in crisis, please reach out
          to a qualified professional or a local support service. Nothing on the
          Site guarantees any particular outcome.
        </p>

        <h2>Our content</h2>
        <p>
          The Site and its original content — the writing, the affirmation
          collections, the design, and the Aurasyncs name and logo — are owned by
          Aurasyncs and protected by applicable laws. Affirmations attributed to a
          named author or source belong to those authors and are included for
          reference. You may not copy substantial portions of the Site for
          commercial purposes without our permission.
        </p>

        <h2>Links to other sites</h2>
        <p>
          The Site may link to third-party websites or resources. We do not
          control and are not responsible for their content, policies, or
          practices. Visiting third-party sites is at your own risk, and we
          encourage you to review their terms and privacy policies.
        </p>

        <h2>Disclaimer and limitation of liability</h2>
        <p>
          The Site is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis, without warranties of any kind. To the fullest
          extent permitted by law, Aurasyncs is not liable for any indirect,
          incidental, or consequential damages arising from your use of, or
          inability to use, the Site.
        </p>

        <h2>Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. When we do, we will revise
          the &quot;Last updated&quot; date above. Your continued use of the Site
          after changes take effect means you accept the revised Terms.
        </p>

        <h2>Contact us</h2>
        <p>
          If you have any questions about these Terms, email us at{' '}
          <a href="mailto:hello@aurasyncs.com">hello@aurasyncs.com</a>.
        </p>
      </div>
    </div>
  );
}
