import { LegalH2, LegalH3, LegalPage } from "./LegalPage";

export function PrivacyPolicyContent() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This Privacy Policy describes how cybervelopro.com (the &quot;Site&quot; or &quot;we&quot;) collects, uses, and
        discloses your Personal Information when you visit or make a purchase from the Site.
      </p>

      <section className="space-y-4">
        <LegalH2>Collecting Personal Information</LegalH2>
        <p>
          When you visit the Site, we collect certain information about your device, your interaction with the Site, and
          information necessary to process your purchases. We may also collect additional information if you contact us
          for customer support.
        </p>
        <LegalH3>Device Information</LegalH3>
        <ul>
          <li>
            <strong>Examples of Personal Information collected:</strong> version of web browser, IP address, time zone,
            cookie information, what sites or products you view, search terms, and how you interact with the Site.
          </li>
          <li>
            <strong>Purpose of collection:</strong> to load the Site accurately for you, and to perform analytics on Site
            usage to optimize our Site.
          </li>
          <li>
            <strong>Source of collection:</strong> Collected automatically when you access our Site using cookies, log
            files, web beacons, tags, or pixels.
          </li>
        </ul>
        <LegalH3>Order Information</LegalH3>
        <ul>
          <li>
            <strong>Examples of Personal Information collected:</strong> name, billing address, shipping address,
            payment information (including credit card numbers), email address, and phone number.
          </li>
          <li>
            <strong>Purpose of collection:</strong> to provide products or services to you to fulfill our contract, to
            process your payment information, arrange for shipping, and provide you with invoices and/or order
            confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the
            preferences you have shared with us, provide you with information or advertising relating to our products or
            services.
          </li>
          <li>
            <strong>Source of collection:</strong> collected from you.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <LegalH2>Sharing Personal Information</LegalH2>
        <p>
          We share your Personal Information with service providers to help us provide our services and fulfill our
          contracts with you, as described above. For example:
        </p>
        <ul>
          <li>We use Shopify to power our online store.</li>
          <li>
            We may share your Personal Information to comply with applicable laws and regulations, to respond to a
            subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our
            rights.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <LegalH2>Behavioral Advertising</LegalH2>
        <p>
          As described above, we use your Personal Information to provide you with targeted advertisements or marketing
          communications we believe may be of interest to you.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Using Personal Information</LegalH2>
        <p>
          We use your personal Information to provide our services to you, which includes: offering products for sale,
          processing payments, shipping and fulfillment of your order, and keeping you up to date on new products,
          services, and offers.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>GDPR &amp; CCPA Rights</LegalH2>
        <p>
          If you are a resident of the EEA or California, you have the right to access the Personal Information we hold
          about you, to port it to a new service, and to ask that your Personal Information be corrected, updated, or
          erased.
        </p>
        <p>If you would like to exercise these rights, please contact us through the contact information below.</p>
      </section>

      <section className="space-y-4">
        <LegalH2>Data Retention</LegalH2>
        <p>
          When you place an order through the Site, we will retain your Personal Information for our records unless and
          until you ask us to erase this information.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Contact Us</LegalH2>
        <p>
          For more information about our privacy practices, if you have questions, or if you would like to make a
          complaint, please contact us by e-mail at{" "}
          <a className="font-bold text-blue-600 hover:underline" href="mailto:support@cybervelopro.com">
            support@cybervelopro.com
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
