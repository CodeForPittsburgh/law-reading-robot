import { Link } from "react-router-dom";
import S from "./Entry.module.css";
import { useFilter } from "../Filter/FilterProvider";
/**
 * @param {EntryProps} props
 **/
const Entry = (props) => {
  const { filter, activeTags } = useFilter();
  console.log(filter);
  const { article } = props;
  const { billNumber, title, summary, link, tags, status, sponsors } = article;
  console.log(activeTags);

  return (
    <article className={S.entry}>
      <h5 className={S.title} data-bill-name={billNumber}>
        {billNumber}
      </h5>
      <div className={S.summary}>
        <h5>Summary:</h5>
        <p className={S.text} data-bill-summary={summary}>
          {summary}
        </p>
      </div>
      <div className={S.details}>
        <h5 className={S.title}>Details:</h5>
        <span>Other info</span>
        {/* <span data-bill-date={pubDate}>{pubDate}</span> */}
        <Link data-bill-link={link} target="_blank" to={link}>
          Full Text
        </Link>
      </div>
    </article>
  );
};

export default Entry;

/**
 * Uses BillData type from Data.js
 * @typedef EntryProps
 * @prop {import("../../Data").BillData} article
 **/
