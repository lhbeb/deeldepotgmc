import { LegalH2, LegalPage } from "./LegalPage";

export function RefundPolicyContent() {
  return (
    <LegalPage title="Refund Policy">
      <p>
        At CB VELO, we stand behind the quality of our products. If you are not entirely satisfied with your purchase,
        we&apos;re here to help. Our return policy is designed to be fair and transparent.
      </p>

      <section className="space-y-4">
        <LegalH2>Return Policy Window</LegalH2>
        <p>
          You have <strong>30 calendar days</strong> to return an item from the date you received it. To be eligible for
          a return, your item must be in the same condition that you received it, and in its original packaging. Items
          that show signs of significant use, wear, or damage may not be eligible for a full refund or may be subject to
          a restocking fee.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Pre-Order &amp; Back-Order Cancellations</LegalH2>
        <p>
          For all pre-orders and back-orders, any cancellation requested before the item has shipped will be subject to
          a 5% processing fee (covering non-refundable payment processor costs).
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Non-Returnable Items</LegalH2>
        <ul>
          <li>Gift cards</li>
          <li>Downloadable software products</li>
          <li>Items listed as &quot;Final Sale&quot; or &quot;As-Is&quot;</li>
          <li>Batteries that have been used or charged</li>
          <li>Items damaged by the customer or missing parts for reasons not due to our error</li>
        </ul>
      </section>

      <section className="space-y-4">
        <LegalH2>How to Initiate a Return</LegalH2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Email Support:</strong> Contact our support team at{" "}
            <a className="font-bold text-blue-600 hover:underline" href="mailto:support@cybervelopro.com">
              support@cybervelopro.com
            </a>{" "}
            with your order number and the reason for the return.
          </li>
          <li>
            <strong>RMA Approval:</strong> Our team will review your request and, if approved, issue a Return Merchandise
            Authorization (RMA) number and provide the return shipping address.
          </li>
          <li>
            <strong>Pack Your Item:</strong> Please pack the item securely in its original packaging with all included
            accessories, manuals, and gifts.
          </li>
          <li>
            <strong>Ship It Back:</strong> You are responsible for paying for your own shipping costs for returning your
            item. We recommend using a trackable shipping service or purchasing shipping insurance.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <LegalH2>Refund Process</LegalH2>
        <p>
          Once we receive your item, we will inspect it and notify you that we have received your returned item. We will
          immediately notify you of the status of your refund after inspecting the item.
        </p>
        <p>
          If your return is approved, we will initiate a refund to your original method of payment. You will receive the
          credit within a certain amount of days, depending on your card issuer&apos;s policies (typically 5-10 business
          days).
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Restocking Fees</LegalH2>
        <p>
          Returns for reasons other than manufacturer defect or shipping damage may be subject to a 15% restocking fee.
          This fee helps cover the costs of inspection, refurbishment, and repackaging.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Contact Us</LegalH2>
        <p>
          If you have any questions on how to return your item to us, please contact us at{" "}
          <a className="font-bold text-blue-600 hover:underline" href="mailto:support@cybervelopro.com">
            support@cybervelopro.com
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
