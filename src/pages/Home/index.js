import React, { useEffect } from "react";
import { Types as _ } from "../../models/Bill/types";
import { Row, Col } from "react-bootstrap";
import { FilterProvider, FilterContainer } from "../../components/Filter";
import { Search, SearchProvider } from "../../components/Search";
import Results from "../../components/Results/Results";
import { useData } from "../../hooks/useData";
import Footer from "../../components/Footer/Footer";
import { randomBills } from "../../Data";
import S from "./Home.module.css";
import { supabase } from "../../supabaseClient";

const DEFAULT_BILLS = randomBills(25);

/**
 * @param {HomeProps} props
 * @returns {JSX.Element}
 */
export const Home = ({ bills = DEFAULT_BILLS }) => {
  const { setData } = useData();

  /**
   * Search logic goes here.
   * Ideally, this callback might do something like:
   * 1. Fetch data from the server
   * 2. Perform a search on existing data, e.g. `bills` - which will update the `Results` component.
   */
  const handleSearch = (e) => {
    console.log(e);
  };

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("bill_data")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.log("error", error);
    else {
      console.log("data", data);
    }
  };

  useEffect(() => {
    fetchData();
    setData(bills);
  }, [bills, setData]);
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
 * @prop {BillData[]} [bills]
 */
