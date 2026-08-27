/** Product images live under `public/images/ek6` (see `scripts/download-images.mjs`). */

const B = "/images/ek6";

export const logoUrl = `${B}/logo.png`;

export const productGallery: { src: string; alt: string }[] = [
  { src: `${B}/gallery/01.jpg`, alt: "Product image 1" },
  { src: `${B}/gallery/02.jpg`, alt: "Product image 2" },
  { src: `${B}/gallery/03.jpg`, alt: "Product image 3" },
  { src: `${B}/gallery/04.jpg`, alt: "Product image 4" },
  { src: `${B}/gallery/05.jpg`, alt: "Product image 5" },
  { src: `${B}/gallery/06.jpg`, alt: "Product image 6" },
  { src: `${B}/gallery/07.png`, alt: "Product image 7" },
  { src: `${B}/gallery/08.jpg`, alt: "Product image 8" },
  { src: `${B}/gallery/09.jpg`, alt: "Product image 9" },
  { src: `${B}/gallery/10.jpg`, alt: "Product image 10" },
  { src: `${B}/gallery/11.jpg`, alt: "Product image 11" },
  { src: `${B}/gallery/12.jpg`, alt: "Product image 12" },
  { src: `${B}/gallery/13.jpg`, alt: "Product image 13" },
];

/** Warranty / certification badges. */
export const warrantyBadge1k = `${B}/warranty/1k.png`;
export const warrantyBadgeUl = `${B}/warranty/ul.png`;

export const bundleOptions = [
  {
    id: "1",
    checkoutId: 57,
    /** WooCommerce bundle quantity tier */
    bundleQty: 1,
    title: "1x EK6 Step-Through",
    badge: "" as const,
    save: "SAVE $400",
    price: "$199.00",
    compare: "$599.00",
  },
  {
    id: "2",
    checkoutId: 59,
    bundleQty: 2,
    title: "2x EK6 Bundle",
    badge: "MOST POPULAR" as const,
    save: "SAVE $849",
    price: "$349.00",
    compare: "$1,198.00",
  },
  {
    id: "3",
    checkoutId: 61,
    bundleQty: 3,
    title: "3x Family Pack",
    badge: "BEST DEAL" as const,
    save: "SAVE $1,298",
    price: "$499.00",
    compare: "$1,797.00",
  },
] as const;

export const accessories: {
  title: string;
  subtitle: string;
  price: string;
  image: string;
  checkoutId: number;
  /** WooCommerce product ID for this add-on */
  wooProductId: number;
  mandatory?: boolean;
}[] = [
    {
      title: "E BIKE Rear Basket",
      subtitle: "Free Gift",
      price: "+FREE",
      image: `${B}/accessories/rear-basket.jpg`,
      checkoutId: 71,
      wooProductId: 43,
      mandatory: true,
    },
    {
      title: "Rear Rack Bag",
      subtitle: "",
      price: "+$19.00",
      image: `${B}/accessories/rack-bag.png`,
      checkoutId: 63,
      wooProductId: 30,
    },
    {
      title: "Bike Chain Lock",
      subtitle: "",
      price: "+$9.99",
      image: `${B}/accessories/chain-lock.jpg`,
      checkoutId: 65,
      wooProductId: 32,
    },
    {
      title: "E-bike Child Seat",
      subtitle: "",
      price: "+$29.90",
      image: `${B}/accessories/child-seat.webp`,
      checkoutId: 67,
      wooProductId: 34,
    },
    {
      title: "E-Bike Phone Holder",
      subtitle: "",
      price: "+$9.90",
      image: `${B}/accessories/phone-holder.webp`,
      checkoutId: 69,
      wooProductId: 36,
    },
  ];

/** WooCommerce product ID for Shipping Protection add-on ($18.99) */
export const SHIPPING_PROTECTION_WOO_ID = 47;

export const rideChoices: { src: string; alt: string }[] = [
  { src: `${B}/ride/01.jpg`, alt: "Ride Choice 1" },
  { src: `${B}/ride/02.jpg`, alt: "Ride Choice 2" },
  { src: `${B}/ride/03.jpg`, alt: "Ride Choice 3" },
  { src: `${B}/ride/04.jpg`, alt: "Ride Choice 4" },
];

export const menuLinks = [
  { href: "/#reviews-section", label: "Reviews" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/warranty-policy", label: "Warranty Policy" },
  { href: "/contact", label: "Contact Us" },
];

export const footerPolicies = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/warranty-policy", label: "Warranty Policy" },
];

export const footerSupport = [
  { href: "/contact", label: "Contact Us" },
  { href: "/#reviews-section", label: "Reviews" },
  { href: "/#faq-section", label: "FAQ" },
];

export const specRows: { label: string; value: string }[] = [
  { label: "Brand", value: "Cybervelo" },
  { label: "Model", value: "EK6" },
  { label: "Battery", value: "48V 25Ah lithium battery" },
  { label: "Charger", value: "5-6 Hours Fast charge" },
  { label: "Battery weight", value: "10 lbs" },
  { label: "Battery size", value: `19.5" * 3.2" * 4.2"` },
  { label: "Range", value: "100miles" },
  { label: "Charging Volt", value: "100V~240V" },
  { label: "Controller", value: "48V/25A" },
  { label: "Display", value: "LCD display" },
  { label: "Hub Motor", value: "1000W rear hub motor (normal)" },
  { label: "Top speed", value: "36MPH (legally required in US)" },
  { label: "Maximum load", value: "400 lbs" },
  { label: "Max torque", value: "90 N.m" },
  { label: "Recommended Rider Heights", value: `5'7" ~ 7'7"` },
  { label: "Weight", value: "85 lbs (with battery)" },
  { label: "Pedal Assist Intelligent", value: "5 Pedal-Assist levels" },
  { label: "Weight", value: "75 lbs (without battery)" },
];

export const comfortFeatures: { title: string; body: string; image: string }[] = [
  {
    title: "Hydraulic Brakes",
    body: "Delivers robust, consistent braking performance for precise, confident handling of heavier e-bikes—even in high-speed scenarios or demanding riding conditions.",
    image: `${B}/comfort/01.png`,
  },
  {
    title: "Shimano 8-Speed Gear Shift",
    body: "Ensures smooth and reliable gear changes for a more controlled and comfortable ride, whether climbing hills or accelerating on flat surfaces.",
    image: `${B}/comfort/02.png`,
  },
  {
    title: "LED Headlight",
    body: "Enhances safety with powerful illumination to increase visibility and confidence when riding in low-light conditions.",
    image: `${B}/comfort/03.png`,
  },
  {
    title: "Front Fork",
    body: "Enhances comfort and control by absorbing impacts from bumps and uneven terrain, providing a smoother and more stable ride.",
    image: `${B}/comfort/04.png`,
  },
  {
    title: "Adjustable Saddle Seat",
    body: "Ensures a comfortable and ergonomic riding position by allowing precise height and angle adjustments to fit your body, reducing fatigue on longer rides.",
    image: `${B}/comfort/05.png`,
  },
  {
    title: "Removable Battery",
    body: "Offers unparalleled convenience and flexibility by allowing you to charge the battery anywhere, eliminating the need to park near an outlet.",
    image: `${B}/comfort/06.png`,
  },
  {
    title: "Large Rear Rack",
    body: "Dramatically improves ride comfort by absorbing road vibrations and shocks from uneven surfaces, significantly smoothing out your journey.",
    image: `${B}/comfort/07.png`,
  },
  {
    title: "Shock-absorbing Seatpost",
    body: "Dramatically improves ride comfort by absorbing road vibrations and shocks from uneven surfaces, significantly smoothing out your journey.",
    image: `${B}/comfort/08.png`,
  },
  {
    title: "Twist Throttle",
    body: "Delivers instant power and effortless acceleration with a simple wrist rotation, providing a boost from a standstill or on demanding hills.",
    image: `${B}/comfort/09.png`,
  },
];

export type FeatureRow = { label: string; value: string }[];
export const featuresAtGlanceSections: { heading: string; rows: FeatureRow }[] = [
  {
    heading: "Build",
    rows: [{ label: "Weight", value: "75 lbs (without battery) & 85 lbs (with battery)" }],
  },
  {
    heading: "Performance",
    rows: [
      { label: "Sensor", value: "YOLIN SPEED SENSOR" },
      { label: "Range", value: "Up to 100 miles" },
      { label: "Motor", value: "Peak 2200W Brushless" },
      { label: "Gears", value: "7-speed" },
      { label: "Payload", value: "400 lbs" },
      { label: "Brakes", value: "Hydraulic brakes" },
      { label: "Tires", value: `20"*4.0 inch` },
      { label: "Foldable", value: `Yes (Length: 38.6", Height: 46", Width: 20")` },
    ],
  },
  {
    heading: "User-Friendly Features",
    rows: [
      { label: "Waterproof", value: "IP54" },
      { label: "Display", value: "LCD Display" },
    ],
  },
  {
    heading: "Rider Fit",
    rows: [
      { label: "Height", value: `5'7" - 7'7" (174cm-235cm)` },
      { label: "Seat", value: "Adjustable" },
    ],
  },
];

export const faqItems: { q: string; a: string }[] = [
  {
    q: "The ebike's weight with and without the battery?",
    a: "75 lbs (without battery) 85 lbs (with battery)",
  },
  {
    q: "What is the recommended height for this electric bike?",
    a: "We recommend it for riders between 5'7\" - 7'7\" (174cm-235cm).",
  },
  {
    q: "What size are the tires on this electric bike?",
    a: "The Cybervelo EK6 features 20\"×4.0\" tires, with a fat-tire design suitable for all-terrain and off-road riding.",
  },
  {
    q: "Is it foldable?",
    a: "Yes it is foldable. EK6 is foldable. It fits easily into your car or any corner of your home.",
  },
  {
    q: "How long is the warranty?",
    a: "1 year on the whole ebike. You can purchase extended warranty coverage at checkout to extend your warranty period. See Warranty Policy for more info.",
  },
  {
    q: "What should I do if my Cybervelo electric bicycle malfunctions?",
    a: "Our dedicated after-sales team is available 24 hours a day, seven days a week to resolve your issues.",
  },
  {
    q: "What certifications does it hold? Does it comply with US regulations?",
    a: "Cybervelo electric bicycles comply with UL2849, UL 2771, EN 15194, UN 38.3, and MSDS certifications. Complies with US standards.",
  },
  {
    q: "Can I install a bicycle trailer?",
    a: "Sure. Our motor shaft is 12mm in diameter, so you'll want a trailer that matches this size. For safety, please ensure the trailer's wheel is smaller than your bicycle's.",
  },
  {
    q: "Can accessories (such as batteries, chargers) be purchased separately?",
    a: "Absolutely. Recommend contacting our Customer Service team first – buy genuine batteries, chargers, rear wheels & other accessories via our official online store.",
  },
];

export const whatsInBox = [
  "Electric bike*1",
  "Manual*1",
  "Charger*1",
  "Rear Reflector*1",
  "Open Spanner",
  "Kickstand*1",
  "Front Wheel Quick Release*1",
  "Headlight*1",
  "Fender*1",
  "Hex Wench*1",
  "Keys*1",
];

export const whatsInBoxItems: { label: string; image: string }[] = [
  { label: "Electric bike*1", image: `${B}/box/01-ebike.webp` },
  { label: "Manual*1", image: `${B}/box/02-manual.webp` },
  { label: "Charger*1", image: `${B}/box/03-charger.webp` },
  { label: "Rear Reflector*1", image: `${B}/box/04-reflector.webp` },
  { label: "Open Spanner", image: `${B}/box/05-spanner.webp` },
  { label: "Kickstand*1", image: `${B}/box/06-kickstand.webp` },
  { label: "Front Wheel Quick Release*1", image: `${B}/box/07-quick-release.webp` },
  { label: "Headlight*1", image: `${B}/box/08-headlight.webp` },
  { label: "Fender*1", image: `${B}/box/09-fender.webp` },
  { label: "Hex Wench*1", image: `${B}/box/10-hex-wrench.webp` },
  { label: "Keys*1", image: `${B}/box/11-keys.webp` },
];

export const geometryImage = `${B}/geometry/diagram.jpg`;

export const geometryMeasurements: string[] = [
  `A -- Total Length 72"`,
  `B -- Maximum Handlebar Height 46"`,
  `C -- Rear Rack Height 27"`,
  `D -- Maximum Seat Height 43"`,
  `E -- Minimum Seat Height 39"`,
  `F -- Frame Height 30"`,
  `G -- Handlebar Length 30"`,
  `H -- Wheel diameter 23"`,
  `Folded Width 28" ; Folded Height 46"`,
];

export const sizeFitImages: { src: string; alt: string }[] = [
  { src: `${B}/size-fit/01.jpg`, alt: "Sizing Guide 1" },
  { src: `${B}/size-fit/02.jpg`, alt: "Sizing Guide 2" },
];
