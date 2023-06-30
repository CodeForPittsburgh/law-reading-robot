import React, { useCallback } from "react";
import { useFilter } from "./FilterProvider";
import { Button } from "react-bootstrap";
import S from "./FilterCategory.module.css";

/**
 * @param {FilterCategoryProps} props
 */
export const FilterCategory = ({ category, index }) => {
  const { filter, handleChange } = useFilter();

  const handleSelect = useCallback(
    (i) => {
      const values = filter?.[index]?.tags;
      values[i] = {
        ...values[i],
        active: !values[i].active,
      };

      const newValue = {
        name: category.name,
        tags: values,
      };
      handleChange(index, newValue);
    },
    [filter, handleChange, index, category.name]
  );

  return (
    <div className={S.details}>
      {filter &&
        filter?.[index]?.tags.map((tag, i) => {
          const isChecked = filter?.[index]?.tags?.[i].active;
          return (
            <Button
              key={i}
              className={S.button}
              variant={isChecked ? "primary" : "outline-primary"}
              onClick={() => handleSelect(i)}
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
 * @prop {number} index
 */
