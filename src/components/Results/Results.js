import S from "./Results.module.css";
import Entry from "./Entry";
import { useMemo, useState } from "react";
import { Sort, sortBy } from "../Sort";
import { FilterButton, useFilter } from "../Filter";
import useData from "../../hooks/useData";

import { Button } from "react-bootstrap";

/**
 * @param {ResultsProps} props
 **/
const Results = (props) => {
  const { handleNext, canLoadMore } = useData();
  const [sorted, setSorted] = useState("");
  const { activeBuckets, filteredData } = useFilter();

  const filteredArticles = useMemo(() => {
    let articles = props.articles;
    let filtered = [];
    if (sorted) {
      articles = sortBy(sorted, articles);
    }

    if (filteredData) {
      filtered = articles.filter(({ id }) => {
        return filteredData.includes(id);
      });
    }

    // If there are no active buckets, return all articles. Otherwise, return filtered articles.
    return activeBuckets.length > 0 ? filtered : articles;
  }, [activeBuckets, sorted, props.articles, filteredData]);

  return (
    <section className={S.summaries}>
      {filteredArticles.length > 0 ? (
        <>
          <Sort handleSort={setSorted} objects={filteredArticles} />
          <div className={S.container}>
            <h2 className={S.title}>Bills</h2>
            <p className={S.total}>({filteredArticles.length} Results)</p>
          </div>
        </>
      ) : (
        <div className={S.container}>
          <h2 className={S.title}>No bills match your search.</h2>
        </div>
      )}
      {filteredArticles.map((article, i) => {
        return (
          <li key={`${article.billNumber}-${i}`}>
            <Entry article={article} />
            <div className={S.tags}>
              {article.tags.map((tag, j) => (
                <FilterButton key={`${tag}-${j}`} tag={tag} />
              ))}
            </div>
          </li>
        );
      })}
      {handleNext && canLoadMore && (
        <Button
          variant={"outline-primary"}
          className={S.button}
          onClick={handleNext}
        >
          Load More
        </Button>
      )}
    </section>
  );
};

export default Results;

/**
 * Uses BillData type from Data.js
 * @typedef ResultsProps
 * @prop {import("../../Data").BillData[]} articles
 **/
