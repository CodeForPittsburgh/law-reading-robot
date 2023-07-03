import S from "./Results.module.css";
import Entry from "./Entry";
import { useMemo, useState } from "react";
import { Sort, sortBy } from "../Sort";
import { FilterButton, useFilter } from "../Filter";

/**
 * @param {ResultsProps} props
 **/
const Results = (props) => {
  const [sorted, setSorted] = useState("");
  const { activeTags, filteredData } = useFilter();

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

    // If there are no active tags, return all articles. Otherwise, return filtered articles.
    return activeTags.length > 0 ? filtered : articles;
  }, [activeTags, sorted, props.articles, filteredData]);

  return (
    <section className={S.summaries}>
      {filteredArticles.length && (
        <Sort handleSort={setSorted} objects={filteredArticles} />
      )}
      <h2 className={S.title}>Bills</h2>
      {filteredArticles.map((article) => {
        return (
          <li key={article.billNumber}>
            <Entry article={article} />
            <div className={S.tags}>
              {article.tags.map((tag, i) => (
                <FilterButton key={`${tag}-${i}`} tag={tag} />
              ))}
            </div>
          </li>
        );
      })}
    </section>
  );
};

export default Results;

/**
 * Uses BillData type from Data.js
 * @typedef ResultsProps
 * @prop {import("../../Data").BillData[]} articles
 **/
