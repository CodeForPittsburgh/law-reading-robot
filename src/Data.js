import { Types as _, BillModel } from "./models/Bill";
let id = 0;

export const rssFiles = [
  "HouseBillsAndResolutions",
  "HouseCommitteeAssignments",
  "HouseCommitteeMeetingSchedule",
  "HouseCoSponsorshipMemoranda",
  "HouseDailySessionReports",
  "HouseLegislativeJournals",
  "HouseMembers",
  "HouseRollCallVotes",
  "HouseVotedAmendments",
  "SenateBillsAndResolutions",
  "SenateCommitteeAssignments",
  "SenateCommitteeMeetingSchedule",
  "SenateCoSponsorshipMemoranda",
  "SenateExecutiveNominationsCalendar",
  "SenateFloorAmendments",
  "SenateLegislativeJournals",
  "SenateMembers",
  "SenateRollCallVotes",
  "SenateSessionCalendar",
  "SenateSessionNotes",
];

const STATUS = ["Introduced", "Referred to Committee", "Pending", "Drafted"];

const SPONSORS = [
  {
    name: "John Doe",
    party: "D",
    id: 1,
  },
  {
    name: "Jane Doe",
    party: "R",
    id: 2,
  },
  {
    name: "Avery Smith",
    party: "D",
    id: 3,
  },
  {
    name: "Chris Aiken",
    party: "R",
    id: 4,
  },
  {
    name: "Alexis Smith",
    party: "D",
    id: 5,
  },
];

// A constant containing all tags that can be applied to a bill
const TAGS = [
  {
    name: "Legislative Reform",
    category: 0,
    id: 1,
  },
  {
    name: "Public Policy",
    category: 0,
    id: 2,
  },
  {
    name: "Governance",
    category: 0,
    id: 3,
  },
  {
    name: "Social Justice",
    category: 1,
    id: 4,
  },
  {
    name: "Equality",
    category: 1,
    id: 5,
  },
  {
    name: "Human Rights",
    category: 1,
    id: 6,
  },
  {
    name: "Environmental Protection",
    category: 2,
    id: 7,
  },
  {
    name: "Consumer Protection",
    category: 2,
    id: 8,
  },
  {
    name: "Labor Rights",
    category: 2,
    id: 9,
  },
  {
    name: "Healthcare Reform",
    category: 3,
    id: 10,
  },
  {
    name: "Education Reform",
    category: 3,
    id: 11,
  },
];

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

/**
 * Generate a random bill
 * @returns {BillModel} A random bill
 */
export function generateRandomBill() {
  const billNumber = "SB" + Math.floor(Math.random() * 1000);
  const pubDate = randomDate(new Date(2020, 0, 1), new Date());
  const title = "This is a random bill";
  const summary =
    "Quodsi haberent magnalia inter potentiam et divitias, et non illam guidem haec eo spectant haec quoque vos omnino desit illud quo solo felicitatis libertatisque perficiuntur.";
  const link = "https://www.google.com";
  // Generate multiple random tags
  const tags = [
    TAGS[Math.floor(Math.random() * TAGS.length)].name,
    TAGS[Math.floor(Math.random() * TAGS.length)].name,
  ];
  const versionHistory = [];
  // Between 0 and 2 sponsors
  let numSponsorsToGenerate = Math.floor(Math.random() * 3);
  const sponsors = [];
  while (numSponsorsToGenerate > 0) {
    sponsors.push(SPONSORS[Math.floor(Math.random() * SPONSORS.length)].name);
    numSponsorsToGenerate--;
  }
  const status = STATUS[Math.floor(Math.random() * STATUS.length)];
  const isReviewed = false;

  return new BillModel({
    id: id++,
    billNumber,
    pubDate,
    title,
    summary,
    link,
    tags,
    versionHistory,
    sponsors,
    status,
    isReviewed,
  });
}

/**
 * Generate a random array of bills
 * @param {number} [count=5] - Number of bills to generate
 * @returns {BillModel[]} An array of random bills
 * */
export const randomBills = (count = 25) =>
  Array.from({ length: count }, () => generateRandomBill());
