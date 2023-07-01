import React from "react";
import { AccordionDetails, AccordionSummary, Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Row, Col, Container } from "react-bootstrap";
import { FilterCategory } from "./FilterCategory";
import { useFilter } from "./FilterProvider";
import Footer from "../footer/Footer";
import S from "./FilterContainer.module.css";

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
      <Row className={S.footerContainer}>
        <Col className={S.footer}>
          <Footer />
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
