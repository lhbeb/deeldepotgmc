/** Customer reviews — staged photos under `public/images/ek6/reviews` (slider only). */

import customerReviewsJson from "./ek6-customer-reviews-data.json";

const R = "/images/ek6/reviews";

const TOTAL = customerReviewsJson.length;

export const customerReviewSummary = {
  average: 5.0,
  totalLabel: `${TOTAL} Reviews`,
  /** Index 0 = 5 stars … index 4 = 1 star */
  distribution: [
    { stars: 5, count: TOTAL, percent: 100 },
    { stars: 4, count: 0, percent: 0 },
    { stars: 3, count: 0, percent: 0 },
    { stars: 2, count: 0, percent: 0 },
    { stars: 1, count: 0, percent: 0 },
  ],
} as const;

export type CustomerReviewEntry = {
  author: string;
  initial: string;
  country: string;
  date: string;
  title: string;
  body: string;
  helpfulUp: number;
  helpfulDown: number;
  images?: string[];
};

export const customerReviews: CustomerReviewEntry[] = customerReviewsJson.map((r) => ({
  ...r,
  initial: r.initial?.length ? r.initial.charAt(0).toUpperCase() : r.author.charAt(0).toUpperCase(),
}));

/** Hero slider — uses staged review photos (not tied to the paginated text list). */
export const reviewSliderSlides = (
  [
    {
      src: `${R}/dadaowl/a99007ee88c44fea9b0dac5c81171ebf.jpg`,
      title: "Worth every penny I spent.",
      body: `for the actual bike, it runs great and looks amazing! Much bigger than I had expected, but still fits in my 2025 Santa Fe cargo with some extra space still left. I didn't even have to fold the back seats or anything. Putting the bike together was super easy and I did it alone within 30mins. A little heavy at around 80lbs, but not bad.

Just to put it out there, about a group of 8 men and women stopped me today to ask about this bike and...they all said they would now buy one after I explained it all and showed them the speed and folding mechanics. I feel like I should get some compensation. 😝😜 I felt like a salesman for the bike, even though I was just excited to show them how it works cuz they said they had been looking for a nice ebike.`,
    },
    {
      src: `${R}/dadaowl/6b69ff8c36854ce7b076ea1320e61fc8.jpg`,
      title: "So glad I switched to an ebike.",
      body: "Bought this ebike for my son we appreciated the quality and how to fold to load into our SUV, assembled very easy weight is not a problem love the headlight.",
    },
    {
      src: `${R}/amazon/61kWnKAmFxL.jpg`,
      title: "Awesome E-bike",
      body: "Pros, I love the this ebike, the cons too heavy and the have a little scratch on back and on clamp of handle bar just because of shipping but it is not the big issue. Fast deliver and great delivery guys.",
    },
    {
      src: `${R}/dadaowl/3c219a83d30c44ac897eb56503467d24.jpg`,
      title: "Nice Bike",
      body: "I recently got my hands on the EK6 bike, and I must say, it's a Nice Bike! It's perfect for cruising around town, and the speed is just right for a leisurely ride. I've been able to cover up to 50 miles without any issues, and it handles well up to 35mph.",
    },
    {
      src: `${R}/dadaowl/bd4f040c145a4880b4223cb1dc3d32a6.jpg`,
      title: "Love",
      body: "Most amazing E-Bike Ever!!!",
    },
    {
      src: `${R}/dadaowl/2d741f21fc674924aed5d5fe3e8fcd1a.jpg`,
      title: "Already thinking about buying a second one.",
      body: "Sometimes ordering on line is hard because you are only seeing pictures of what you might be interested in buying. You don't always know how good of a product you are buying. No problem here, I am very happy with this bike. Fit and finish were great and performance was much better than I expected. My 250lbs was no problem for this bike. It is a bit heavy, but I think that's what makes it a quality bike.",
    },
    {
      src: `${R}/amazon/81TmmQbXGML.jpg`,
      title: "Customer satisfaction with this e-bike.",
      body: "I did a tremendous amount of research on different foldable e-bikes. Always came back looking at this one. Am I glad I did, have had it for a week now and it is above and beyond expectations with the performance and battery.",
    },
    {
      src: `${R}/amazon/91gO0CmOD5L.jpg`,
      title: "This purchase was worth the money",
      body: "This was a great addition to the family, The bike was exactly like described, and adding it to the game that I love (golf), is a match made in heaven. Customer Service was great.",
    },
  ] as const
).map((s) => ({
  src: s.src,
  alt: `Product review — ${s.title}`,
  title: s.title,
  body: s.body,
}));

export const CUSTOMER_REVIEWS_PAGE_SIZE = 10;
