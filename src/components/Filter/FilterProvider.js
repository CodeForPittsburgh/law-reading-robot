import { useState, createContext, useContext, useEffect, useMemo } from "react";
import { findCategory } from "./FilterCategory";

/**
 * Dto for a filter tag.
 * @param {import("./FilterContainer").Category[]} categories
 * @returns {Filter[]}
 */
const toFilter = (categories) => {
  let offset = 0;
  return categories.map((category, i) => {
    offset++;
    const tags = category.tags.map((tag, j) => {
      if (j === 0) offset++;
      return {
        id: i + j + offset - 1,
        name: tag,
        active: false,
        category: i,
      };
    });
    return {
      name: category.name,
      tags,
    };
  });
};

/**
 * Because category data is not available in the filter context, we need to mock it.
 * However, mocked data below does not provide the category id; as a result, we need to
 * generate it ourselves. This is implicitly done via the `toFilter` function using the
 * an index of the category in the array as the id.
 *
 * This means that category data can be stored in the structure below i.e. with two properties:
 * - name
 * - tags (array of strings)
 * @type {Category[]}
 * */
const CATEGORY_MOCK = [
  {
    name: "Category 1",
    tags: ["Legislative reform", "Public policy", "Governance"],
  },
  {
    name: "Category 2",
    tags: ["Social justice", "Equality", "Human rights"],
  },
  {
    name: "Category 3",
    tags: ["Environmental protection", "Consumer protection", "Labor rights"],
  },
  {
    name: "Category 4",
    tags: ["Healthcare reform", "Education reform"],
  },
];

/**
 * This should not be used directly. Instead, use the `useFilter` hook.
 * @returns {FilterContext}
 */
const FilterContext = createContext({
  /** @type {Filter[]} */ filter: [],
  /** @type {changeFilterCallback} */ handleChange: () => {},
  /** @type {getCategoryCallback} */ getCategory: () => {},
  /** @type {FilterCategory[]} */ activeTags: [],
});

/**
 * Must be used within a {@link FilterProvider}.
 * @example
 * ...
 * <FilterProvider>
 *     <FilterContainer />
 * </FilterProvider>
 * ...
 * const FilterContainer = () => {
 *   const { filter } = useFilter();
 *
 *   const filteredValues = filter.map((category) => {
 *      return category.tags.filter((tag) => tag.active);
 *    });
 *
 *    return (
 *    <div>
 *     {filteredValues.map(value => <p>{value}</p>)}
 *   </div>
 *  )
 * }
 * ...
 * @returns {FilterContext}
 * */
export const useFilter = () => {
  const context = useContext(FilterContext);
  return context;
};

/**
 * @param {FilterProps} props
 */
export const useFilterContext = (categories) => {
  const [filter, setFilter] = useState([]);

  const handleChange = (i, value) => {
    const values = [...filter];
    values[i] = value;
    setFilter(values);
  };

  const getCategory = (tag) => {
    return findCategory(tag, categories);
  };

  const activeTags = useMemo(
    /**
     * @returns {FilterCategory[]} factory
     **/
    () => {
      const tags = [];
      filter.forEach((category) => {
        category.tags.forEach((tag) => {
          if (tag.active) tags.push(tag);
        });
      });
      return tags;
    },
    [filter]
  );

  useEffect(() => {
    const newFilter = toFilter(categories);
    setFilter(newFilter);
  }, [categories]);

  return { filter, handleChange, getCategory, activeTags };
};

/**
 * @param {FilterProps} props
 */
export const FilterProvider = ({ categories = CATEGORY_MOCK, children }) => {
  const context = useFilterContext(categories);
  return (
    <FilterContext.Provider value={context}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;

/**
 * @typedef FilterProps
 * @prop {import("./FilterContainer").Category[]} categories
 */

/**
 * @typedef Filter
 * @property {string} name
 * @property {FilterCategory[]} tags
 */

/**
 * @typedef FilterCategory
 * @property {number|string} id
 * @property {number} category
 * @property {string} name
 * @property {boolean} active
 */

/**
 * @callback changeFilterCallback
 * @param {string|number} key
 * @param {unkown} value
 */

/**
 * @callback getCategoryCallback
 * @param {string|number} key
 * @param {unkown} value
 * @returns {number}
 * */

/**
 * @typedef FilterContext
 * @type {object}
 * @property {object} [filter] - key and values used to filter.
 * @property {changeFilterCallback} [handleChange] - callback used to set keys and value on filter
 * @property {getCategoryCallback} [getCategory] - callback used to get index of filter with given key and value
 * @property {FilterCategory[]} [activeTags] - array of active tags
 */
