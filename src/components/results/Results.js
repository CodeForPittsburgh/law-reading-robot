import S from "./Results.module.css";
import Entry from "./Entry";
import { useFilter } from "../Filter/FilterProvider";
import { useMemo } from "react";
import { FilterButton } from "../Filter/FilterCategory";

/**
 * @param {ResultsProps} props
 **/
const Results = (props) => {
  const { articles } = props;
  const { activeTags } = useFilter();

  const filteredArticles = useMemo(() => {
    const filtered = articles.filter((article) => {
      const { tags } = article;
      const tagNames = activeTags?.map((tag) => tag.name);
      return tagNames ? tags.some((tag) => tagNames.includes(tag)) : true;
    });
    // If there are active tags and no results, return empty array
    return activeTags.length > 0 ? filtered : articles;
  }, [articles, activeTags]);
  return (
    <section className={S.summaries}>
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
