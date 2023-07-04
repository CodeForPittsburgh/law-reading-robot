import { Types as _ } from ".";
import { useState, createContext, useContext, useEffect, useMemo } from "react";
import { useData } from "../../hooks/useData";
import { FilterService } from "../../services/FilterService";

/**
 * This should not be used directly. Instead, use the `useFilter` hook.
 * @returns {FilterContext}
 */
const FilterContext = createContext({
  /** @type {Filter[]} */ filter: [],
  /** @type {changeFilterCallback} */ handleChange: () => {},
  /** @type {getCategoryCallback} */ getCategory: () => {},
  /** @type {FilterBucket[]} */ activeBuckets: [],
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
export const useFilterContext = (categories, data) => {
  /**
   * @type {[Filter[], React.Dispatch<Filter[]>]} state
   */
  const [filter, setFilter] = useState(
    /**
     *  @type {Filter[]}
     */ []
  );

  /**
   * @param {string|number} key
   * @param {Filter[]} value
   * */
  const handleChange = (key, value) => {
    const values = [...filter];
    values[key] = value;
    setFilter(values);
  };

  /**
   * @param {string} bucketName
   * @returns {Filter}
   * */
  const getCategory = (bucketName) => {
    const cat = filter.find((category) => {
      return category.buckets.find((bucket) => bucket.name === bucketName);
    });

    return cat ?? -1;
  };

  const activeBuckets = useMemo(
    /**
     * @returns {FilterBucket[]} factory
     **/
    () => {
      /** @type {FilterBucket[]} */
      const buckets = [];
      filter.forEach((category) => {
        category.buckets.forEach((bucket) => {
          if (bucket.active) buckets.push(bucket);
        });
      });
      return buckets;
    },
    [filter]
  );

  const filteredData = useMemo(
    /**
     * @description Returns an array of data ids that match the active tags.
     * @returns {number[]} factory
     **/ () => {
      /**
       * Filter should be conjunction of all active tags within a category.
       */
      const grouped = activeBuckets.reduce((acc, { category, values }) => {
        acc.set(category, [...(acc.get(category) || []), values]);
        return acc;
      }, new Map());
      /**
       * Intersection of all data ids between categories.
       */
      const dataIds = Array.from(grouped.values()).reduce((acc, values, i) => {
        const ids = values.flat();
        if (i === 0) return ids;
        const intersection = acc.filter((id) => ids.includes(id));
        return intersection.length === 0 ? [] : intersection;
      }, []);
      return dataIds;
    },
    [activeBuckets]
  );

  useEffect(() => {
    if (data) {
      const newFilter = FilterService.toFilter(data);
      setFilter(newFilter);
    }
  }, [categories, data]);

  return { filter, handleChange, getCategory, activeBuckets, filteredData };
};

/**
 * @param {FilterProviderProps} props
 */
export const FilterProvider = ({ categories, children }) => {
  const { data } = useData();

  const context = useFilterContext(categories, data);
  return (
    <FilterContext.Provider value={context}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;

/**
 * @typedef FilterProviderProps
 * @prop {import("./FilterContainer").Category[]} categories
 * @prop {React.ReactNode} children
 */
