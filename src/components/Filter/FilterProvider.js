import { Types as _ } from ".";
import { useState, createContext, useContext, useEffect, useMemo } from "react";
import { useData } from "../../hooks/useData";
import { FilterService } from "../../services/FilterService";

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
    name: "Cateogry 1",
    tags: ["Legislative Reform", "Public Policy", "Governance"],
  },
  {
    name: "Category 2",
    tags: ["Social Justice", "Equality", "Human rights"],
  },
  {
    name: "Category 3",
    tags: ["Environmental Protection", "Consumer Protection", "Labor Rights"],
  },
  {
    name: "Category 4",
    tags: ["Healthcare Reform", "Education Reform"],
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
export const useFilterContext = (categories, data) => {
  /**
   * @type {[Filter[], React.Dispatch<Filter[]>]} state
   */
  const [filter, setFilter] = useState(
    /**
     *  @type {Filter[]}
     */ []
  );

  const handleChange = (i, value) => {
    const values = [...filter];
    values[i] = value;
    setFilter(values);
  };

  /**
   * @param {string} tag
   * @returns {FilterCategory}
   * */
  const getCategory = (tag) => {
    const cat = filter.find((category) => {
      return category.tags.find((t) => t.name === tag);
    });

    return cat ?? -1;
  };

  const activeTags = useMemo(
    /**
     * @returns {FilterCategory} factory
     **/
    () => {
      /** @type {FilterCategory[]} */
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

  const filteredData = useMemo(
    /**
     * @description Returns an array of data ids that match the active tags.
     * @returns {number[]} factory
     **/ () => {
      /**
       * Filter should be conjunction of all active tags within a category.
       */
      const grouped = activeTags.reduce((acc, { category, values }) => {
        acc.set(category, [...(acc.get(category) || []), values]);
        return acc;
      }, new Map());
      /**
       * Intersection of all data ids between categories.
       */
      const dataIds = Array.from(grouped.values()).reduce(
        (acc, [values], i) => {
          if (i === 0) return values;
          const intersection = acc.filter((id) => values.includes(id));
          return intersection.length === 0 ? [] : intersection;
        },
        []
      );
      return dataIds;
    },
    [activeTags]
  );

  useEffect(() => {
    if (data) {
      const newFilter = FilterService.toFilter(data);
      setFilter(newFilter);
    }
  }, [categories, data]);

  return { filter, handleChange, getCategory, activeTags, filteredData };
};

/**
 * @param {FilterProps} props
 */
export const FilterProvider = ({ categories = CATEGORY_MOCK, children }) => {
  const { data } = useData();

  const context = useFilterContext(categories, data);
  return (
    <FilterContext.Provider value={context}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;

/**
 * @typedef FilterProps
 * @prop {import("./FilterContainer").Category[]} categories
 */
