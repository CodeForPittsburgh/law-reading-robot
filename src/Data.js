

// A constant containing all tags that can be applied to a bill
export const TAGS = [
    "Legislative reform", "Public policy", "Governance", "Social justice", "Equality", "Human rights",
    "Environmental protection", "Consumer protection", "Labor rights", "Healthcare reform", "Education reform"
    ];

export class BillData {

    constructor(
        billNumber, // Bill Number e.g. SB106
        pubDate, // Date the bill was published
        title, // Bill title (if the titles from the feed are useful
        summary, // Summary text
        link, // Link to full text
        tags, // Tags for the piece of legislation
        versionHistory, // Version history of bill (all of these for every previous version of this bill)
        sponsors, // Sponsors of bill
        status, // Status of the bill, e.g. whether it is passed.
        isReviewed // Has the summary text been reviewed by a human
        // TODO: More properties to add?
    ) {
        this.billNumber = billNumber;
        this.pubDate = pubDatel
        this.title = title;
        this.summary = summary;
        this.link = link;
        this.tags = tags;
        this.versionHistory = versionHistory;
        this.sponsors = sponsors;
        this.status = status;
        this.isReviewed = isReviewed;

    }
}