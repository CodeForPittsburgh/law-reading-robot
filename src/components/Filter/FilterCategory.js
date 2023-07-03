import { Types as _ } from ".";
import React, { useCallback, useMemo } from "react";
import { Button } from "react-bootstrap";
import { useFilter } from "./FilterProvider";
import S from "./FilterCategory.module.css";

/**
 * Used in individual filter buttons. Do not use in {@link FilterCategory}.
 * @param {FilterButtonProps} props
 * @returns {JSX.Element}
 */
export const FilterButton = ({ tag }) => {
  const { handleChange, getCategory, filter } = useFilter();
  const category = useMemo(() => getCategory(tag), [getCategory, tag]);

  const categoryIdx = useMemo(
    /**
     * @returns {number} factory
     */
    () => {
      if (category === undefined) return -1;
      return filter.findIndex((c) => c === category);
    },
    [filter, category]
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
    [filter, categoryIdx, tag]
  );

  /** @type {handleSelect} */
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
     */
    () => {
      return filter.findIndex((c) => c.name === category.name);
    },
    [filter, category.name]
  );

  /** @type {handleSelect} */
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
 * @prop {Filter} category
 */

/**
 * @callback handleSelect
 * @param {FilterCategory} id
 * @returns {void}
 */

/**
 * @typedef FilterButtonProps
 * @prop {string} tag
 */
