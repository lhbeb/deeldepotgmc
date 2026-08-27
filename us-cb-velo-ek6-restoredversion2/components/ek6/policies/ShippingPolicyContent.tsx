import { LegalH2, LegalH3, LegalPage, PolicyTable } from "./LegalPage";

export function ShippingPolicyContent() {
  return (
    <LegalPage title="Shipping Policy">
      <section className="space-y-4">
        <LegalH2>Shipping Confirmation &amp; Order Tracking</LegalH2>
        <p>
          You will receive a Shipping Confirmation email once your order has shipped containing your tracking number(s).
          The tracking number will be active within 24 hours.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Domestic Shipping Policy</LegalH2>
        <LegalH3>Shipment Processing Time</LegalH3>
        <p>
          All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.
        </p>
        <p>
          If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional
          days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you
          via email or telephone.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Shipping Rates &amp; Delivery Estimates</LegalH2>
        <p>
          Shipping charges for your order will be calculated and displayed at checkout. We primarily offer free standard
          shipping on all bike orders to the Continental United States.
        </p>
        <PolicyTable
          headers={["Shipment Method", "Estimated Delivery Time", "Shipment Cost"]}
          rows={[
            ["FedEx / UPS Standard", "5-7 Business Days", "Free"],
            ["Expedited Shipping", "2-5 Business Days", "Calculated at Checkout"],
          ]}
        />
        <p className="text-xs text-zinc-500">
          *Delivery delays can occasionally occur due to extreme weather, holiday peak seasons, or remote locations.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Customs, Duties and Taxes</LegalH2>
        <p>
          CB VELO is not responsible for any customs and taxes applied to your order. All fees imposed during or after
          shipping are the responsibility of the customer (tariffs, taxes, etc.).
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Damages &amp; Lost Packages</LegalH2>
        <p>
          CB VELO is not liable for any products damaged or lost during shipping. If you received your order damaged,
          please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before
          filing a claim.
        </p>
        <p>
          For orders with <strong>Shipping Protection</strong> enabled during checkout, please contact our support team
          immediately if your package is lost or arrives damaged for priority replacement/refund.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>International Shipping Policy</LegalH2>
        <p>
          We do ship outside the U.S. Shipping rates and delivery times for international orders are calculated at
          checkout based on the destination and package weight.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Contact Us</LegalH2>
        <p>
          If you have any questions about our Shipping Policy, please contact us at{" "}
          <a className="font-bold text-blue-600 hover:underline" href="mailto:support@cybervelopro.com">
            support@cybervelopro.com
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
