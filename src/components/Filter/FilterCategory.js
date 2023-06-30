import React, { useCallback, useMemo } from "react";
import { useFilter } from "./FilterProvider";
import { Button } from "react-bootstrap";
import S from "./FilterCategory.module.css";

/**
 *
 * @param {string} tag
 * @returns {Category} category in which tag is found
 */
export const findCategory = (tag, categories) => {
  return categories.find((category) => category.tags.includes(tag));
};

/**
 * Used in individual filter buttons. Do not use in FilterCategory.
 * @param {FilterButtonProps} props
 * @returns {JSX.Element}
 */
export const FilterButton = ({ tag }) => {
  const { handleChange, getCategory, filter } = useFilter();
  const category = useMemo(() => getCategory(tag), [getCategory, tag]);

  const categoryIdx = useMemo(
    /**
     * @returns {number} factory
     * @param {FilterCategory} category
     */
    () => {
      return filter.findIndex((c) => c.name === category.name);
    },
    [filter, category.name]
  );

  const isChecked = useMemo(
    /**
     * @returns {boolean} factory
     */
    () => {
      const category = filter?.[categoryIdx];
      const idx = category?.tags.findIndex((t) => t.name === tag);
      return category?.tags[idx]?.active;
    },
    [getCategory, filter]
  );

  /** @type {HandleSelect} */
  const handleSelect = useCallback(
    ({ id }) => {
      // Get the values for the currentcategory
      const values = filter?.[categoryIdx]?.tags;
      const idx = values.findIndex((tag) => tag.name === id);
      values[idx] = {
        ...values[idx],
        active: !values[idx]?.active,
      };
      const newValue = {
        name: category.name,
        tags: values,
      };
      handleChange(categoryIdx, newValue);
    },
    [filter, handleChange, categoryIdx, category.name]
  );

  return (
    <Button
      className={S.button}
      variant={isChecked ? "primary" : "outline-primary"}
      onClick={() => handleSelect({ id: tag })}
    >
      {tag}
    </Button>
  );
};

/**
 * @param {FilterCategoryProps} props
 */
export const FilterCategory = ({ category }) => {
  const { filter, handleChange } = useFilter();

  const categoryIdx = useMemo(
    /**
     * @returns {number} factory
     * @param {FilterCategory} category
     */
    () => {
      return filter.findIndex((c) => c.name === category.name);
    },
    [filter, category.name]
  );

  /** @type {HandleSelect} */
  const handleSelect = useCallback(
    ({ id }) => {
      // Get the values for the currentcategory
      const values = filter?.[categoryIdx]?.tags;
      const idx = values.findIndex((tag) => tag.id === id);
      values[idx] = {
        ...values[idx],
        active: !values[idx].active,
      };
      const newValue = {
        name: category.name,
        tags: values,
      };
      handleChange(categoryIdx, newValue);
    },
    [filter, handleChange, categoryIdx, category.name]
  );

  return (
    <div className={S.details}>
      {filter &&
        filter?.[categoryIdx]?.tags.map((tag, i) => {
          const isChecked = filter?.[categoryIdx]?.tags?.[i].active;
          return (
            <Button
              key={i}
              className={S.button}
              variant={isChecked ? "primary" : "outline-primary"}
              onClick={() => handleSelect(tag)}
            >
              {tag.name}
            </Button>
          );
        })}
    </div>
  );
};

export default FilterCategory;

/**
 * @typedef FilterCategoryProps
 * @prop {import("./FilterContainer").Category} category
 */

/**
 * @callback HandleSelect
 * @param {import("./FilterProvider").FilterCategory} id
 * @returns {void}
 */

/**
 * @typedef FilterButtonProps
 * @prop {string} tag
 */
