import { LegalH2, LegalPage, PolicyTable } from "./LegalPage";

export function WarrantyPolicyContent() {
  return (
    <LegalPage title="Warranty Policy">
      <section className="space-y-4">
        <LegalH2>CB VELO Limited Warranty</LegalH2>
        <p>
          All CB VELO e-bikes are covered under our manufacturer&apos;s limited warranty to the original purchaser. This
          warranty protects against defects in materials and workmanship under normal use and service conditions.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Detailed Coverage</LegalH2>
        <PolicyTable
          headers={["Component", "Warranty Period", "Coverage"]}
          rows={[
            ["Main Frame", "2 Years", "Structural Integrity"],
            ["Battery & Motor", "1 Year", "Manufacturer Defects"],
            ["Controller & Display", "1 Year", "Electrical Failures"],
            ["Drivetrain Components", "6 Months", "Mechanical Failures"],
          ]}
        />
      </section>

      <section className="space-y-4">
        <LegalH2>What Is Not Covered?</LegalH2>
        <p>
          This warranty is void if the e-bike is subject to abuse, neglect, improper repair, improper maintenance,
          alteration, modification, an accident or other abnormal, excessive, or improper use.
        </p>
        <ul>
          <li>
            <strong>Normal Wear and Tear:</strong> Tires, tubes, brake pads, cabling, housing, grips, and chain.
          </li>
          <li>
            <strong>Water Damage:</strong> Submerging the bike in water or cleaning with high-pressure washers.
          </li>
          <li>
            <strong>Commercial Use:</strong> Use of the bike for rental, delivery, or commercial applications.
          </li>
          <li>
            <strong>Modifications:</strong> Use of non-original parts or electrical modifications.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <LegalH2>How to Make a Claim</LegalH2>
        <p>
          To initiate a warranty claim, please contact our support team at{" "}
          <a className="font-bold text-blue-600 hover:underline" href="mailto:sales@cybervelopro.com">
            sales@cybervelopro.com
          </a>
          .
        </p>
        <p>You will be required to provide:</p>
        <ul>
          <li>Your original order number and date of purchase.</li>
          <li>A clear description of the issue.</li>
          <li>Supporting photos and/or videos of the defective part.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <LegalH2>Warranty Shipping Costs</LegalH2>
        <p>
          For approved claims within the first 30 days of ownership, CB VELO will cover all shipping costs for replacement
          parts. After 30 days, the customer is responsible for shipping costs associated with receiving warranty replacement
          parts.
        </p>
      </section>

      <section className="space-y-4">
        <LegalH2>Contact Us</LegalH2>
        <p>
          If you have any questions about our Warranty Policy, please contact us at{" "}
          <a className="font-bold text-blue-600 hover:underline" href="mailto:sales@cybervelopro.com">
            sales@cybervelopro.com
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
