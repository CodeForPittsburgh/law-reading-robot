import S from "./Results.module.css";
import Entry from "./Entry";
import { useFilter } from "../Filter/FilterProvider";
import { useMemo } from "react";

/**
 * @param {ResultsProps} props
 **/
const Results = (props) => {
  const { articles } = props;
  const { filter } = useFilter();

  const filteredArticles = useMemo(() => {
    const filtered = articles.filter((article) => {
      const { tags } = article;
      let activeTags = [];
      filter.forEach((category) => {
        const active = category.tags.filter((tag) => tag.active);
        activeTags = [...activeTags, ...active];
      });
      const tagNames = activeTags?.map((tag) => tag.name);
      return tagNames ? tags.some((tag) => tagNames.includes(tag)) : true;
    });
    return filtered.length ? filtered : articles;
  }, [articles, filter]);

  return (
    <section className={S.summaries}>
      <h2 className={S.title}>Bills</h2>
      {filteredArticles.map((article) => {
        return (
          <li key={article.billNumber}>
            <Entry article={article} />
            <p>{article.tags}</p>
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
