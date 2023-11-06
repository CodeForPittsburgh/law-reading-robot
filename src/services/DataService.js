import { supabase } from "../supabaseClient";
import { toBillModel } from "../Data";
import { Types as _, BillModel as _BillModel } from "../models/Bill";

/**
 * @name DataService
 * @description
 * A service that handles all data fetching and manipulation. This service
 * is responsible for fetching data from Supabase, and transforming it into
 * a format that the application can use. This service is also responsible
 * for handling errors.
 * @example
 * const data = await DataService.FetchData();
 * // [BillModel, BillModel, BillModel, ...]
 */
export class DataService {
  /**
   * @memberof DataService
   * @description The Supabase client. Should not be used outside of this service.
   * @static
   * @type {import("@supabase/supabase-js").SupabaseClient}
   */
  static client = supabase;

  /**
   * @memberof DataService
   * @description The number of data to show per page.
   * @static
   * @type {number}
   * @default 10
   */
  static itemsPerPage = 10;

  /**
   * @description A function that fetches the nextPage set of data. This is
   * set by as a static property by the most recent call to FetchData or
   * Search.
   * @memberof DataService
   * @static
   * @async
   * @returns {Promise<_BillModel[]>|Promise<Error>}
   */
  static NextPage = async (page = 1) => {};

  /**
   * @param {DataError} error
   * @memberof DataService
   * @static
   * @throws {Error}
   * @example
   * DataService.Error("Something went wrong");
   */
  static Error({ message }) {
    /**
     * Here we could log the error to a service like Sentry, and then
     * return a custom error message to the user.
     */
    throw new Error(message);
  }

  /**
   * @param {SupabaseBillData[]} data
   * @returns {_BillModel[]}
   * @memberof DataService
   * @static
   * @example
   * const data = DataService.handleBillData(data);
   * // [BillModel, BillModel, BillModel, ...]
   */
  static handleBillData(data) {
    /**
     * @type {_BillModel[]}
     */
    const bills = data.map((bill) => toBillModel(bill));
    return bills;
  }

  /**
   * @memberof DataService
   * @static
   * @async
   * @returns {Promise<DataResponse>|Promise<Error>}
   * @throws {Error}
   * @example
   * const data = await DataService.FetchData();
   * // [BillModel, BillModel, BillModel, ...]
   * */
  static async FetchData(page = 1) {
    /**
     * @type {import("@supabase/supabase-js").PostgrestResponse<SupabaseBillData>}
     */
    const offset = (page - 1) * this.itemsPerPage;
    const { data, count,error } = await this.client
      .from("bill_data")
      .select("*", {count: 'exact'})
      .range(offset, offset + this.itemsPerPage - 1)
      .order("id", { ascending: true });
    if (error != null)
      this.Error({
        error,
        message: "Error loading initial bill data! Please try again.",
      });

    // If there is no data, set NextPage to return an empty array. This prevents the call
    this.NextPage = async (page=1) => {
      console.log(page, 'pageeee');
      const _data = await this.FetchData(page);
      return _data;
    };

    return {data: this.handleBillData(data), count};
  }

  /**
   * @description Fetches data from the server. For now, this
   * only searches for bill by description.
   * @param {string} searchTerm -- string to search for.
   * @returns {Promise<_BillModel[]>|Promise<Error>}
   * @memberof DataService
   * @static
   * @example
   * const data = await DataService.Search("test");
   * // [BillModel, BillModel, BillModel, ...]
   * */
  static async Search(searchTerm, page = 1) {
    /**
     * @type {import("@supabase/supabase-js").PostgrestResponse<SupabaseBillData>}
     * */
    const offset = (page - 1) * this.itemsPerPage;
    const { data, count,error } = await this.client
      .from("bill_data")
      .select("*", {count: "exact"})
      .range(offset, offset + this.itemsPerPage - 1)
      .textSearch("description", `%${searchTerm}%`);

    if (error != null)
      this.Error({ error, message: "An error occured with your search." });

    this.NextPage = async (page=1) => {
      const _data = await this.Search(page);
      return _data;
    };

    return {data: this.handleBillData(data), count};
  }
}

/**
 * @description A bill object from the Supabase database as stored in the "bill_data" view.
 * @typedef {Object} SupabaseBillData
 * @property {number} id
 * @property {string} bill-number
 * @property {string[]} co-sponsors
 * @property {string} description
 * @property {string} link
 * @property {string} primary-sponsor
 * @property {SupabaseBillStatus} status
 * @property {string[]} tags
 * @property {string} title
 */

/**
 * @description A bill status object from the Supabase database.
 * @typedef {Object} SupabaseBillStatus
 * @property {string} date
 * @property {boolean} enacted
 * @property {string} last_action
 * @property {boolean} passed_house
 * @property {boolean} passed_senate
 */

/**
 * @typedef {Object} DataResponse
 * @property {BillModel[]} data
 * @property {string|null} error
 */

/**
 * @typedef {Object} DataError
 * @property {Error} error
 * @property {string} message
 */
