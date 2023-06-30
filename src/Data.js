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

// A constant containing all tags that can be applied to a bill
export const TAGS = [
  {
    name: "Legislative reform",
    category: 0,
    id: 1,
  },
  {
    name: "Public policy",
    category: 0,
    id: 2,
  },
  {
    name: "Governance",
    category: 0,
    id: 3,
  },
  {
    name: "Social justice",
    category: 1,
    id: 4,
  },
  {
    name: "Equality",
    category: 1,
    id: 5,
  },
  {
    name: "Human rights",
    category: 1,
    id: 6,
  },
  {
    name: "Environmental protection",
    category: 2,
    id: 7,
  },
  {
    name: "Consumer protection",
    category: 2,
    id: 8,
  },
  {
    name: "Labor rights",
    category: 2,
    id: 9,
  },
  {
    name: "Healthcare reform",
    category: 3,
    id: 10,
  },
  {
    name: "Education reform",
    category: 3,
    id: 11,
  },
];
/**
 * A constant containing all categories that can be applied to a bill
 * @type {BillData}
 * @constructor
 * @param {string} billNumber - Bill Number e.g. SB106
 * @param {Date} pubDate - Date the bill was published
 * @param {string} title - Bill title (if the titles from the feed are useful
 * @param {string} summary - Summary text
 * @param {string} link - Link to full text
 * @param {string[]} tags - Tags for the piece of legislation
 * @param {object[]} versionHistory - Version history of bill (all of these for every previous version of this bill)
 * @param {string[]} sponsors - Sponsors of bill
 * @param {string} status - Status of the bill, e.g. whether it is passed.
 * @param {boolean} isReviewed - Has the summary text been reviewed by a human
 * @returns {BillData}
 * */
export class BillData {
  constructor(
    billNumber,
    pubDate,
    title,
    summary,
    link,
    tags,
    versionHistory,
    sponsors,
    status,
    isReviewed
    // TODO: More properties to add?
  ) {
    /**
     * @type {string} - Bill Number e.g. SB106
     */
    this.billNumber = billNumber;
    /**
     * @type {Date} - Date the bill was published
     * */
    this.pubDate = pubDate;
    /**
     * @type {string} - Bill title (if the titles from the feed are useful
     **/
    this.title = title;
    /**
     * @type {string} - Summary text
     * */
    this.summary = summary;
    /**
     * @type {string} - Link to full text
     * */
    this.link = link;
    /**
     * @type {string[]} - Tags for the piece of legislation
     * */
    this.tags = tags;
    /**
     * @type {object[]} - Version history of bill (all of these for every previous version of this bill)
     * */
    this.versionHistory = versionHistory;
    /**
     * @type {string[]} - Sponsors of bill
     * */
    this.sponsors = sponsors;
    /**
     * @type {string} - Status of the bill, e.g. whether it is passed.
     * */
    this.status = status;
    /**
     * @type {boolean} - Has the summary text been reviewed by a human
     * */
    this.isReviewed = isReviewed;
  }
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

/**
 * Generate a random bill
 * @returns {BillData} A random bill
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
  const sponsors = ["John Doe"];
  const status = "Pending";
  const isReviewed = false;

  return new BillData(
    billNumber,
    pubDate,
    title,
    summary,
    link,
    tags,
    versionHistory,
    sponsors,
    status,
    isReviewed
  );
}

/**
 * @typedef {Object} BillData
 * @property {string} [billNumber] - Bill Number e.g. SB106
 * @property {Date} [pubDate] - Date the bill was published
 * @property {string} [title] - Bill title (if the titles from the feed are useful
 * @property {string} [summary] - Summary text
 * @property {string} [link] - Link to full text
 * @property {string[]} [tags] - Tags for the piece of legislation
 * @property {object[]} [versionHistory] - Version history of bill (all of these for every previous version of this bill)
 * @property {string[]} [sponsors] - Sponsors of bill
 * @property {string} [status] - Status of the bill, e.g. whether it is passed.
 * @property {boolean} [isReviewed] - Has the summary text been reviewed by a human
 */
