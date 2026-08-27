/**
 * Rebuilds lib/ek6-customer-reviews-data.json:
 * - Page 1: MeThoD → L. A. (photo reviews)
 * - Page 2: Kayla → tobillos (duplicate Soymile as in design)
 * - Rest: previous file from Katelyn onward
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const R = "/images/ek6/reviews";

const page1 = [
  {
    author: "MeThoD",
    initial: "M",
    country: "US",
    date: "July 5, 2025",
    title: "Worth every penny I spent.",
    body: `for the actual bike, it runs great and looks amazing! Much bigger than I had expected, but still fits in my 2025 Santa Fe cargo with some extra space still left. I didn't even have to fold the back seats or anything. Putting the bike together was super easy and I did it alone within 30mins. A little heavy at around 80lbs, but not bad.

Just to put it out there, about a group of 8 men and women stopped me today to ask about this bike and...they all said they would now buy one after I explained it all and showed them the speed and folding mechanics. I feel like I should get some compensation. 😝😜 I felt like a salesman for the bike, even though I was just excited to show them how it works cuz they said they had been looking for a nice ebike.`,
    helpfulUp: 3,
    helpfulDown: 0,
    images: [
      `${R}/dadaowl/a99007ee88c44fea9b0dac5c81171ebf.jpg`,
      `${R}/dadaowl/0dbc5689ea9041dd8064e4bfd35c65d2.jpg`,
      `${R}/dadaowl/0e42c690117345c2a8d170e058187171.jpg`,
      `${R}/dadaowl/f697e5b6601647f7af4d1ef666aeddeb.jpg`,
      `${R}/dadaowl/fc903c9cb574441dac32ca08b1343624.jpg`,
    ],
  },
  {
    author: "Antonio",
    initial: "A",
    country: "US",
    date: "July 5, 2025",
    title: "So glad I switched to an ebike.",
    body: "Bought this ebike for my son we appreciated the quality and how to fold to load into our SUV, assembled very easy weight is not a problem love the headlight.",
    helpfulUp: 0,
    helpfulDown: 0,
    images: [
      `${R}/dadaowl/6b69ff8c36854ce7b076ea1320e61fc8.jpg`,
      `${R}/dadaowl/8cf2db97d1f24607b84940a6b176cad9.jpg`,
      `${R}/dadaowl/54210e498fb94701bd95e82f188f9e2d.jpg`,
      `${R}/dadaowl/4e3f706004bb47899a1307c5ad819f34.jpg`,
    ],
  },
  {
    author: "Ghel",
    initial: "G",
    country: "US",
    date: "January 11, 2025",
    title: "Awesome E-bike",
    body: "Pros, I love the this ebike, the cons too heavy and the have a little scratch on back and on clamp of handle bar just because of shipping but it is not the big issue. Fast deliver and great delivery guys.",
    helpfulUp: 0,
    helpfulDown: 1,
    images: [`${R}/amazon/61kWnKAmFxL.jpg`, `${R}/amazon/710M1KenWyL.jpg`, `${R}/amazon/71h5sdeL6gL.jpg`],
  },
  {
    author: "SASunshine",
    initial: "S",
    country: "US",
    date: "June 25, 2025",
    title: "Nice Bike",
    body: "I recently got my hands on the EK6 bike, and I must say, it's a Nice Bike! It's perfect for cruising around town, and the speed is just right for a leisurely ride. I've been able to cover up to 50 miles without any issues, and it handles well up to 35mph. The design is sleek and modern, and it's definitely turning heads wherever I go. I'd highly recommend this bike to anyone looking for a reliable and stylish ride!",
    helpfulUp: 1,
    helpfulDown: 2,
    images: [`${R}/dadaowl/3c219a83d30c44ac897eb56503467d24.jpg`],
  },
  {
    author: "Antonio",
    initial: "A",
    country: "US",
    date: "July 5, 2025",
    title: "Love",
    body: "Most amazing E-Bike Ever!!!",
    helpfulUp: 1,
    helpfulDown: 1,
    images: [`${R}/dadaowl/bd4f040c145a4880b4223cb1dc3d32a6.jpg`],
  },
  {
    author: "Great e-Bike!",
    initial: "G",
    country: "US",
    date: "July 5, 2025",
    title: "Already thinking about buying a second one.",
    body: "Sometimes ordering on line is hard because you are only seeing pictures of what you might be interested in buying. You don't always know how good of a product you are buying. No problem here, I am very happy with this bike. Fit and finish were great and performance was much better than I expected. My 250lbs was no problem for this bike. It is a bit heavy, but I think that's what makes it a quality bike.",
    helpfulUp: 1,
    helpfulDown: 0,
    images: [`${R}/dadaowl/2d741f21fc674924aed5d5fe3e8fcd1a.jpg`],
  },
  {
    author: "Nikkel",
    initial: "N",
    country: "US",
    date: "November 20, 2024",
    title: "Customer satisfaction with this e-bike.",
    body: "I did a tremendous amount of research on different foldable e-bikes. Always came back looking at this one. Am I glad I did, have had it for a week now and it is above and beyond expectations with the performance and battery. It came delivered and the 90% totally built is not an exaggeration and it all fit perfect. Within 1/2 hour I was going down the road. The only problem I had is the seat was not low enough for me so I texted the company and heard back almost immediately and they will be forwarding me a new design of seat that they say will work better. Looking at getting another for my wife now, I am that impressed. Thank you Emily for the good service",
    helpfulUp: 1,
    helpfulDown: 0,
    images: [`${R}/amazon/81TmmQbXGML.jpg`],
  },
  {
    author: "Donny Marshall",
    initial: "D",
    country: "US",
    date: "November 13, 2024",
    title: "This purchase was worth the money",
    body: "This was a great addition to the family, The bike was exactly like described, and adding it to the game that I love (golf), is a match made in heaven.Customer Service was great, even though the problem was all my like of knowledge, Michelle from customer Service was wonderful, she responded promptly, politely, and very efficiently. You can buy a similar e-bike, buy you can't get another Michelle from Cybervelo Customer Service, for that alone, I would recommend Cybervelo to my family and friends.",
    helpfulUp: 2,
    helpfulDown: 0,
    images: [`${R}/amazon/91gO0CmOD5L.jpg`],
  },
  {
    author: "Karina",
    initial: "K",
    country: "US",
    date: "June 12, 2025",
    title: "Worth every penny for my side gig.",
    body: "I deliver packages part-time, and this bike cuts my delivery time in half. The large rear rack holds 3-4 boxes easily, and the 30mph speed gets me between stops fast. Battery lasts my entire 6-hour shift, even with constant start-stopping. Folds up to fit in apartment lobbies when making deliveries there. ",
    helpfulUp: 1,
    helpfulDown: 0,
  },
  {
    author: "L. A.",
    initial: "L",
    country: "US",
    date: "July 8, 2025",
    title: "My commute's actually enjoyable now, not just a chore to endure.",
    body: "The bike's suspension makes rough trails feel like pavement. I ride through a wooded path to work that's full of tree roots—before this, my hands would go numb from the vibrations. Now? The front fork soaks up all the bumps. ",
    helpfulUp: 3,
    helpfulDown: 3,
  },
];

const dataPath = path.join(root, "lib", "ek6-customer-reviews-data.json");
const prev = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const p2head = prev.slice(0, 9);
const soymile = prev[2];
const page2 = [...p2head.slice(0, 3), structuredClone(soymile), ...p2head.slice(3)];
if (page2.length !== 10) throw new Error("page2 length");

const tail = prev.slice(9);
const merged = [...page1, ...page2, ...tail];

fs.writeFileSync(dataPath, JSON.stringify(merged, null, 2));
console.error("reviews:", merged.length, "pages:", Math.ceil(merged.length / 10));
