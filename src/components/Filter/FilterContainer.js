import { Types as _ } from ".";
import React from "react";
import { AccordionDetails, AccordionSummary, Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterCategory } from "./FilterCategory";
import { useFilter } from "./FilterProvider";
import S from "./FilterContainer.module.css";

/**
 * @param {FilterContainerProps} props
 */
export const FilterContainer = () => {
  const { filter } = useFilter();
  return (
    <>
      <h5 className={S.title}>Filters</h5>
      {filter &&
        filter?.map((category, i) => (
          <Accordion
            className={S.accordion}
            style={{ boxShadow: "none", border: "none" }}
            key={`accordion-${category.name}-${i}`}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {category.name}
            </AccordionSummary>
            <AccordionDetails>
              <FilterCategory
                key={`${category.name}-${i + 1}`}
                category={category}
                index={i}
              />
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};

export default FilterContainer;

/**
 * @typedef FilterContainerProps
 * @prop {Category[]} categories
 */
