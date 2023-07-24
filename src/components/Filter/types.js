/**
 * @typedef Filter
 * @property {string} name
 * @property {FilterBucket[]} buckets
 */

/**
 * @typedef FilterBucket
 * @property {number|string} id
 * @property {number} category
 * @property {string} name
 * @property {boolean} active
 * @property {number[]} values
 */

/**
 * @typedef FilterContext
 * @type {object}
 * @property {Filter[]} filter - key and values used to filter.
 * @property {changeFilterCallback} handleChange - callback used to set keys and value on filter.
 * @property {getCategoryCallback} [getCategory] - callback used to get index of filter with given key and value
 * @property {FilterBucket[]} [activeBuckets] - array of active buckets
 */

/**
 * @typedef Category
 * @type {object}
 * @property {string} name - name of category.
 * @property {string[]} tags - tags available on category
 */

/**
 * @callback changeFilterCallback
 * @param {string|number} key - Which category to change
 * @param {Filter[]} value - Values to change
 */

/**
 * @callback getCategoryCallback
 * @param {string|number} key
 * @param {unkown} value
 * @returns {number}
 * */
