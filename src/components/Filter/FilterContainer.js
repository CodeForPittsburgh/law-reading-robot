import { Types as _ } from ".";
import React from "react";
import { AccordionDetails, AccordionSummary, Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterCategory } from "./FilterCategory";
import { useFilter } from "./FilterProvider";
import S from "./FilterContainer.module.css";

/**
 * @description Filter container component for the sidebar. This component
 * will render a list of `FilterCategory` components in an accordion.
 * @returns {JSX.Element}
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
