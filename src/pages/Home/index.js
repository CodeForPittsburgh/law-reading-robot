import React from "react";
import { Row, Col } from "react-bootstrap";
import { FilterProvider, FilterContainer } from "../../components/Filter";
import { Search, SearchProvider } from "../../components/Search";
import Results from "../../components/Results/Results";
import Footer from "../../components/Footer/Footer";
import { randomBills } from "../../Data";
import S from "./Home.module.css";

const DEFAULT_BILLS = randomBills(5);

/**
 * @param {HomeProps} props
 * @returns {JSX.Element}
 */
export const Home = ({ bills = DEFAULT_BILLS }) => {
  /**
   * Search logic goes here.
   * Ideally, this callback might do something like:
   * 1. Fetch data from the server
   * 2. Perform a search on existing data, e.g. `bills` - which will update the `Results` component.
   */
  const handleSearch = (e) => {
    console.log(e);
  };

  return (
    <SearchProvider handleSearch={handleSearch}>
      <FilterProvider>
        <Col md={3} className={S.sidebar}>
          <Row>
            <Col>
              <FilterContainer />
            </Col>
          </Row>
          <Row>
            <Col className={S.search}>
              <Search />
            </Col>
          </Row>
          <Row className={S.footerContainer}>
            <Col className={S.footer}>
              <Footer />
            </Col>
          </Row>
        </Col>
        <Col className={S.results}>
          <Results articles={bills} />
        </Col>
      </FilterProvider>
    </SearchProvider>
  );
};

export default Home;

/**
 * @typedef HomeProps
 * @prop {import("../../Data").BillData[]} [bills]
 */
