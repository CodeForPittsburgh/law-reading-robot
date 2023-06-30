import { AccordionDetails, AccordionSummary } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FilterCategory } from "./FilterCategory";
import { useFilter } from "./FilterProvider";
import S from "./FilterContainer.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * @param {FilterContainerProps} props
 */
export const FilterContainer = () => {
  const { filter } = useFilter();
  return (
    <Container>
      <Row>
        <Col>
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
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Search</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterContainer;

/**
 * @typedef FilterContainerProps
 * @prop {Category[]} categories
 */

/**
 * @typedef Category
 * @type {object}
 * @property {string} name - name of category.
 * @property {string[]} tags - tags available on category
 */
