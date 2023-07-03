import { BillFilter } from "./types";
export * as Types from "./types";

/**
 * A model containing all properties that can be applied to a bill.
 * @type {BillData}
 * */
export class BillModel {
  /**
   * @param {BillData} data
   */
  constructor(
    {
      id,
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
    } // TODO: More properties to add?
  ) {
    this.id = id;
    this.billNumber = billNumber;
    this.pubDate = pubDate;
    this.title = title;
    this.summary = summary;
    this.link = link;
    this.tags = tags;
    this.versionHistory = versionHistory;
    this.sponsors = sponsors;
    this.status = status;
    this.isReviewed = isReviewed;
  }

  /**
   * @description
   * Returns categories according to BillFilter
   * @returns {BillFilter}
   * @memberof BillModel
   * @static
   * @example
   * const categories = BillModel.getCategories();
   * // ["date", "sponsors", "tags", "status"]
   * */
  static getCategories() {
    return BillFilter;
  }
}
