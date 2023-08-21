import { Types as _ } from "../../models/Bill/types";
import { Row, Col } from "react-bootstrap";
import {
  FilterProvider,
  FilterContainer,
  Search,
  SearchProvider,
  Results,
  Footer,
} from "../../components";

import { useData } from "../../hooks/useData";
import S from "./Home.module.css";

/**
 * @param {HomeProps} props
 * @returns {JSX.Element}
 */
export const Home = () => {
  const { data, handleSearch } = useData();

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
          {data && data.length > 0 ? (
            <Results articles={data} />
          ) : (
            <div className={S["no-results"]}>
              <h2 className={S.title}>No bills match your search.</h2>
            </div>
          )}
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
