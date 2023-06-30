import React from "react";
import { Col } from "react-bootstrap";
import { FilterProvider, FilterContainer } from "../../components/Filter";
import { randomBills } from "../../Data";
import S from "./Home.module.css";

const DEFAULT_BILLS = randomBills(5);

/**
 * @param {HomeProps} props
 * @returns {JSX.Element}
 */
export const Home = ({ bills = DEFAULT_BILLS }) => {
  return (
    <FilterProvider>
      <Col sm={3} className={S.filter}>
        <FilterContainer />
      </Col>
      <Col className={S.results}>
        <Results articles={bills} />
      </Col>
    </FilterProvider>
  );
};

export default Home;

/**
 * @typedef HomeProps
 * @prop {import("../../Data").BillData[]} [bills]
 */
