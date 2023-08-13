/**
 * @description
 * Constants describing filterable properties of a bill
 * */
const DATE = "pubDate";
const SPONSORS = "sponsors";
const TAGS = "tags";
const STATUS = "status";

/**
 * @description
 * Filterable properties of a bill.
 * @type {BillFilter}
 * */
export const BillFilter = {
  DATE,
  SPONSORS,
  TAGS,
  STATUS,
};

export default BillFilter;
