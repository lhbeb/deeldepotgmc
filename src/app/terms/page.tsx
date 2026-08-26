import React from 'react';

const TermsPage = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#262626] mb-2">Deel Depot Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last Updated: {currentDate}</p>
        
        <div className="prose max-w-none text-gray-700 space-y-8">
          <p className="text-lg leading-relaxed">
            Welcome to Deel Depot, a multi-category marketplace connecting buyers with Deel Depot and approved third-party sellers. By accessing or using our website, marketplace, or services, you agree to be bound by these Terms of Service. Please read them carefully. If you do not agree, please discontinue using the site.
          </p>

          {/* Section 1: Overview */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">1. Overview</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deel Depot operates as a direct retailer and as a curated multi-category marketplace.</li>
              <li>Our marketplace may include e-bikes, cameras, gaming consoles, electronics, fashion, furniture, collectibles, home goods, and other consumer products.</li>
              <li>Products may be sold by Deel Depot or by an approved third-party seller. The seller is identified on the applicable product page or order information.</li>
              <li>We source products through auctions, private sellers, liquidators, wholesalers, and other third-party suppliers.</li>
              <li>All purchases made through Deel Depot are processed under these Terms.</li>
            </ul>
          </div>

          {/* Section 2: Account Terms */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">2. Account Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be 18 years or older to use this service.</li>
              <li>You must provide accurate and complete information during account creation.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must notify us immediately of any unauthorized access or security concerns.</li>
            </ul>
          </div>

          {/* Section 3: Marketplace and Private Seller Terms */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">3. Marketplace and Private Seller Terms</h2>
            <p className="mb-4">
              Deel Depot hosts a controlled marketplace where approved private sellers may offer products. Deel Depot provides the platform, payment experience, buyer support, and the protections described in these Terms. The seller shown on the listing remains responsible for the product, the accuracy of the listing, and compliance with applicable law.
            </p>

            <h3 className="text-xl font-bold text-[#262626] mt-6 mb-3">3.1 Seller Onboarding Process</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Private sellers must be screened and approved before listing items.</li>
              <li>We may collect and verify seller identity, contact, payment, tax, and business information as required by law and our marketplace standards.</li>
              <li>Seller information may be displayed on listings, order records, or other marketplace pages where required by law.</li>
              <li>Items may be inspected, authenticated, tested, or verified by Deel Depot before shipment when the listing or category requires it.</li>
            </ul>

            <h3 className="text-xl font-bold text-[#262626] mt-6 mb-3">3.2 Fulfillment Process</h3>
            <p className="mb-2">When you purchase an item from a third-party seller:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>It is clearly indicated on the product page.</li>
              <li>The item may ship from a Deel Depot facility, an authentication or inspection location, or the approved seller, as stated in the order details.</li>
              <li>Selected high-value, luxury, refurbished, or pre-owned products may require additional inspection or authentication before dispatch.</li>
              <li>Orders containing items from different sellers may arrive in separate packages and on different dates.</li>
            </ul>
            <p className="mb-4">
              Deel Depot reserves the right to reject, refund, or cancel any order if the item fails inspection.
            </p>

            <h3 className="text-xl font-bold text-[#262626] mt-6 mb-3">3.3 Seller Responsibility</h3>
            <p className="mb-2">Sellers on the Deel Depot platform are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>The authenticity of their products</li>
              <li>Providing accurate condition descriptions</li>
              <li>Providing accurate photographs, specifications, dimensions, compatibility details, and included accessories</li>
              <li>Disclosing whether an item is new, used, refurbished, open-box, vintage, or customized</li>
              <li>Meeting our quality and safety standards</li>
              <li>Complying with product safety, recall, intellectual property, tax, and consumer protection requirements</li>
            </ul>
            <p>
              Deel Depot is not responsible for inaccurate representations made by sellers, although we take all reasonable steps to verify product condition before shipment.
            </p>
          </div>

          {/* Section 4: Product Terms */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">4. Product Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We aim to provide accurate and detailed product descriptions.</li>
              <li>We sell new, open-box, refurbished, vintage, and pre-owned items, each clearly labeled where applicable.</li>
              <li>Condition, testing, authentication, warranty, compatibility, dimensions, and included accessories vary by item and are described in the listing.</li>
              <li>For cameras, electronics, gaming consoles, e-bikes, and other serialized goods, we may record serial numbers or identifying details for fraud prevention, returns, and safety purposes.</li>
              <li>Colours, measurements, materials, and condition may appear differently across screens or may show reasonable signs of prior use when the item is listed as pre-owned.</li>
              <li>Product availability is not guaranteed until an order is processed.</li>
              <li>Prices may change at any time due to market conditions and sourcing costs.</li>
              <li>We reserve the right to modify, limit, or discontinue any product or listing.</li>
            </ul>
          </div>

          {/* Section 5: Sourcing Transparency */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">5. Sourcing Transparency</h2>
            <p className="mb-4">
              By using our website, you acknowledge that Deel Depot sources products through:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Online auctions and bidding platforms</li>
              <li>Private sellers and independent sourcers</li>
              <li>Liquidation and return departments of major retailers</li>
              <li>Garage sales, local auctions, and community sales</li>
              <li>Wholesalers and bulk suppliers</li>
            </ul>
            <p>
              These sourcing methods allow us to offer competitive pricing.
            </p>
            <p className="mt-2">
              You agree that cosmetic variations, packaging differences, or shelf pull characteristics may occur with certain items unless stated otherwise.
            </p>
          </div>

          {/* Section 6: Shipping Policy */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">6. Shipping Policy</h2>
            <p className="mb-4">
              Shipping applies to all orders within the United States and Canada.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Same-day shipping is available for orders placed before 2:00 PM EST.</li>
              <li>Standard processing time is 1 business day.</li>
              <li>Domestic USA delivery time is typically 5 to 8 business days.</li>
              <li>Canada delivery time is typically 7 to 10 business days.</li>
              <li>All orders qualify for free shipping.</li>
              <li>Tracking information is sent to the customer via email once the order ships.</li>
            </ul>
            <p className="mt-4">
              Deel Depot is not responsible for delays caused by carriers or incorrect shipping information provided by the customer.
            </p>
          </div>

          {/* Section 7: Payment Terms */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">7. Payment Terms</h2>
            <p className="mb-4">We accept the following payment methods:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Credit and debit cards</li>
              <li>Visa, Mastercard, American Express</li>
              <li>PayPal</li>
              <li>Shop Pay</li>
              <li>Apple Pay</li>
            </ul>
            <p className="mt-4">
              All payments must be received in full before an order is processed.
            </p>
          </div>

          {/* Section 8: Returns and Satisfaction Guarantee */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">8. Returns and Satisfaction Guarantee</h2>
            <p className="mb-4">Your satisfaction is our priority.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We offer a 30 day hassle free return policy.</li>
              <li>Items must be returned in the same condition received.</li>
              <li>Refunds are issued after the item passes inspection at our warehouse.</li>
              <li>Exchanges are available when inventory permits.</li>
              <li>We work quickly to resolve any concerns, disputes, or issues.</li>
            </ul>
            <p className="mt-4">
              Marketplace seller products also fall under this guarantee unless a clearly disclosed category-specific exception applies. Certain personalized, hygiene-sensitive, final-sale, digital, hazardous, or oversized items may have different return requirements as explained on the listing and in our Return & Exchange Policy. Your statutory rights are not affected.
            </p>
          </div>

          {/* Section 9: Limitation of Liability */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              Deel Depot is not liable for indirect, incidental, punitive, or consequential damages arising from your use of our services, products, or platform.
            </p>
            <p>
              However, we are committed to resolving legitimate customer concerns and will work with you to reach a fair and reasonable solution.
            </p>
          </div>

          {/* Section 10: Fraud Prevention and Compliance */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">10. Fraud Prevention and Compliance</h2>
            <p className="mb-4">
              Deel Depot monitors orders for unusual activity to protect customers and sellers.
            </p>
            <p className="mb-4">
              We reserve the right to cancel or delay orders suspected of fraud or unauthorized use of payment methods.
            </p>
            <p>
              Creating false accounts, listing products fraudulently, or misrepresenting product ownership is strictly prohibited.
            </p>
            <p className="mt-4">
              Sellers may not list counterfeit, stolen, recalled, unsafe, prohibited, or unlawfully obtained goods. Deel Depot may remove listings, hold or cancel transactions, request proof of authenticity or ownership, restrict accounts, and cooperate with payment providers, rights holders, carriers, or law enforcement where reasonably necessary.
            </p>
          </div>

          {/* Section 11: Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-[#262626] mt-10 mb-4">11. Contact Information</h2>
            <p className="mb-4">
              If you have questions about these Terms of Service, please contact us.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div>
                <div className="font-medium text-[#262626] mb-1">Phone:</div>
                <div className="text-gray-600">+19129231747</div>
              </div>
              <div>
                <div className="font-medium text-[#262626] mb-1">Email:</div>
                <div className="text-gray-600">contact@deeldepot.com</div>
              </div>
              <div>
                <div className="font-medium text-[#262626] mb-1">UK Registered Office:</div>
                <div className="text-gray-600">20 Matlock Cl, London, Greater London SE24 0BB, United Kingdom</div>
              </div>
              <div>
                <div className="font-medium text-[#262626] mb-1">US Dispatch Center:</div>
                <div className="text-gray-600">1249 Coney Island Ave, Brooklyn, NY 11230, United States</div>
              </div>
              <div>
                <div className="font-medium text-[#262626] mb-1">Hours:</div>
                <div className="text-gray-600">Monday to Friday, 9:00 AM to 5:00 PM EST</div>
                <div className="text-gray-600">Saturday, 10:00 AM to 3:00 PM EST</div>
                <div className="text-gray-600">Sunday, Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 
