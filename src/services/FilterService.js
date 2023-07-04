import { BillModel, Types as _ } from "../models/Bill";
import { toTitleCase, isString, isDate } from "../helpers";

/**
 * @description
 * FilterService is a service that provides methods to filter data
 * @returns {FilterService}
 */
export class FilterService {
  /**
   * @param {BillModel[]} data
   * @static
   * @memberof FilterService
   * @description
   * Factory to bucket uncategorized data using properties on the data
   * @example
   * const filter = FilterService.toFilter(filter, categories);
   */
  static toFilter(data) {
    const categories = BillModel.getCategories();
    const [keys, values] = [Object.keys(categories), Object.values(categories)];
    // Create a filter object with the category keys as human readable names.
    const filter = keys.map((category) => {
      return {
        // Capitalize the first letter of the category name.
        name: toTitleCase(category),
        // Create an empty array to store the filter buckets.
        buckets: [],
      };
    });

    // Using categories to access data properties, populate the filter buckets.
    data.reduce((acc, item) => {
      values.forEach((category, i) => {
        const value = item[category];
        if (value) {
          acc[i].buckets.push({ id: item?.id, value });
        }
      });
      return acc;
    }, filter);

    // Bucket the tags
    const bucketed = filter.map((category) => {
      return {
        /**
         * @type {string}
         */
        name: category.name,
        /**
         * @type {Map<string, number[]>}
         * */
        buckets: this.toBucket(category.buckets),
      };
    });

    const filterable = this.toFilterableCategories(bucketed);

    return filterable;
  }

  /**
   * Generates unique buckets for each category according to type.
   * After bucket is generated, it stores an id of the corresponding article in the tag.
   * @param { object[] } data
   */
  static toBucket(data) {
    /**
     * If data type is not all the same, throw an error.
     */
    const types = new Set(data.map(({ value }) => typeof value));
    try {
      if (types.size > 1) {
        throw new Error(
          "Data type is not all the same. Please check your data."
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (types.size > 1) return new Map();
    }
    /**
     * Maps are useful for storing occurrences of a value given a unique key.
     */
    const buckets = new Map();
    const first = data?.[0]?.value;
    switch (true) {
      /**
       * If type is a string, then bucket by string.
       * */
      case isString(first):
        data.forEach(({ id, value }) => {
          const bucket = toTitleCase(value);
          buckets.set(bucket, [...(buckets.get(bucket) || []), id]);
        });
        return buckets;
      /**
       * If type is a Date, then bucket by year.
       * */
      case isDate(first):
        data.forEach(({ id, value }) => {
          const bucket = value.getFullYear();
          buckets.set(bucket, [...(buckets.get(bucket) || []), id]);
        });
        return buckets;
      /**
       * If type is an array of strings, then value must be added to each bucket.
       */
      case Array.isArray(first):
        /** Flatten the array of tag arrays.
         * Example:
         *[["a", "b"], ["c", "d"], ["a", "c"]] => ["a", "b", "c", "d"]
         */
        data.forEach(({ id, value }) => {
          const inner = value.map((v) => toTitleCase(v.toLowerCase()));
          inner.forEach((bucket) => {
            buckets.set(bucket, [...(buckets.get(bucket) || []), id]);
          });
        });

        return buckets;
      // Return one bucket for all values.
      default:
        return new Map([["All", data.map(({ id }) => id)]]);
    }
  }

  /**
   *
   * @param {Category[]} categories
   * @returns {FilterableCategory[]}
   */
  static toFilterableCategories(categories) {
    let offset = 0;
    const _categories = categories.map((category, i) => {
      const buckets = Array.from(category.buckets.entries()).map(
        ([key, value], j) => {
          return {
            id: i + j + offset,
            name: key,
            active: false,
            category: i,
            values: value,
          };
        }
      );
      offset += buckets.length - 1;
      return {
        name: category.name,
        buckets,
      };
    });

    return _categories;
  }
}

/**
 * @typedef {object} Category
 * @property {string} name
 * @property {Bucket[]} buckets
 */

/**
 * @typedef {object} Bucket
 * @property {string} name
 * @property {number[]} values - Array of ids that correspond to the bucket.
 */

/**
 * @typedef {object} FilterableCategory
 * @property {string} name
 * @property {FilterableBucket[]} buckets
 */

/**
 * @typedef {object} FilterableBucket
 * @property {string} name
 * @property {number[]} values - Array of ids that correspond to the bucket.
 * @property {boolean} active - Whether the bucket is active or not.
 * @property {number} category - The category index that the bucket belongs to.
 * @property {number} id - The unique id of the bucket.
 */
