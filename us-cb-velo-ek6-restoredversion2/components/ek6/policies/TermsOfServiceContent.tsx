import { LegalH2, LegalPage } from "./LegalPage";

export function TermsOfServiceContent() {
  return (
    <LegalPage title="Terms of Service">
      <section className="space-y-4">
        <LegalH2>1. Acceptance of Terms</LegalH2>
        <p>
          By accessing and using cybervelopro.com, you accept and agree to be bound by the terms and provision of this
          agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or
          rules applicable to such services.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>2. Accuracy of Content</LegalH2>
        <p>
          While we strive to provide accurate information, CB VELO does not warrant that product descriptions, prices, or
          other content on this site is accurate, complete, reliable, current, or error-free. We reserve the right to
          correct any errors, inaccuracies or omissions and to change or update information at any time without prior
          notice.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>3. User Conduct</LegalH2>
        <p>
          You are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to
          perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state
          regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or
          the intellectual property rights of others.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>4. Intellectual Property</LegalH2>
        <p>
          The Site and its original content, features, and functionality are owned by CB VELO and are protected by
          international copyright, trademark, patent, trade secret, and other intellectual property or proprietary
          rights laws.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>5. Limitation of Liability</LegalH2>
        <p>
          In no event shall CB VELO, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable
          for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of
          profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or
          inability to access or use the Service.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>6. Indemnification</LegalH2>
        <p>
          You agree to indemnify, defend and hold harmless CB VELO and our parent, subsidiaries, affiliates, partners,
          officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and
          employees, harmless from any claim or demand, including reasonable attorneys&apos; fees, made by any third-party
          due to or arising out of your breach of these Terms of Service.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>7. Termination</LegalH2>
        <p>
          We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason
          whatsoever, including without limitation if you breach the Terms.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>8. Governing Law</LegalH2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of Hong Kong and you
          irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>9. Changes to Terms</LegalH2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a
          material change will be determined at our sole discretion. By continuing to access or use our Service after those
          revisions become effective, you agree to be bound by the revised terms.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Contact Us</LegalH2>
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a className="font-bold text-blue-600 hover:underline" href="mailto:support@cybervelopro.com">
            support@cybervelopro.com
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
