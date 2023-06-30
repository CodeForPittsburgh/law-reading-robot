import { useState, createContext, useContext, useEffect, useMemo } from "react";

const toCategoryFilter = (categories) => {
  let offset = 0;
  return categories.map((category, i) => {
    offset++;
    const tags = category.tags.map((tag, j) => {
      if (j === 0) offset++;
      return {
        id: i + j + offset - 1,
        name: tag,
        active: false,
      };
    });
    return {
      name: category.name,
      tags,
    };
  });
};

/** @type {Category[]} */
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
 * @callback changeFilterCallback
 * @param {string|number} key
 * @param {unkown} value
 */

/**
 * @callback getFilterCallback
 * @param {string|number} key
 * @param {unkown} value
 * @returns {number}
 * */

/**
 * @typedef FilterContext
 * @type {object}
 * @property {object} [filter] - key and values used to filter.
 * @property {changeFilterCallback} [handleChange] - callback used to set keys and value on filter
 * @property {getFilterCallback} [getFilter] - callback used to get index of filter with given key and value
 * @property {FilterCategory[]} [activeTags] - array of active tags
 */

/**
 * Import the filter context to access and change filter values.
 * This must be used within the {@link FilterProvider} component,
 * @returns {FilterContext}
 */
export const FilterContext = createContext({
  /** @type {Array} */ filter: [],
  /** @type {changeFilterCallback} */ handleChange: () => {},
  /** @type {getFilterCallback} */ getFilter: () => {},
  /** @type {FilterCategory[]} */ activeTags: [],
});

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

  /** Returns array of active tags
   * @type {FilterCategory[]}
   */
  const activeTags = useMemo(() => {
    const tags = [];
    filter.forEach((category) => {
      category.tags.forEach((tag) => {
        if (tag.active) tags.push();
      });
    });
    return tags;
  }, [filter]);

  /** Returns index of filter with given matching key, value pair */
  const getFilter = (value) => {
    return;
  };

  useEffect(() => {
    const newFilter = toCategoryFilter(categories);
    setFilter(newFilter);
  }, []);

  return { filter, handleChange, getFilter, activeTags };
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
 * @typedef FilterCategory
 * @property {number|string} id
 * @property {string} name
 * @property {boolean} active
 */
