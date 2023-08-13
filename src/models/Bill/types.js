/**
 * @description
 * BillData describes the data that is returned from the database.
 * @typedef {Object} BillData
 * @property {number} id - Unique ID for the bill
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

/**
 * @description
 * BillFilterOptions describes the options that can be applied to a bill filter.
 * @typedef {Object} BillFilter
 * @property {string} DATE - Date the bill was published
 * @property {string[]} SPONSORS - Sponsors of bill
 * @property {string[]} TAGS - Tags for the piece of legislation
 * @property {string} STATUS - Status of the bill, e.g. whether it is passed.
 * */
