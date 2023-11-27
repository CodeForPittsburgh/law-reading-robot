import { Link } from "react-router-dom";
import S from "./Entry.module.css";
/**
 * @param {EntryProps} props
 **/
const Entry = (props) => {
  const { article } = props;
  const { billNumber, summary, link, sponsors, pubDate } = article;

  return (
    <article className={S.entry}>
      <div className={S.details}>
        <div className={S.billNumber}>
          <span className={S.title}> Bill: </span>
          <span data-bill-number={billNumber}>{billNumber}</span>
        </div>
        <div className={S.sponsors}>
          <span className={S.title}>Sponsor{`${sponsors.length > 1 ? "s" : ""}`}:{" "}</span>
          {sponsors.slice(0, 1).map((sponsor, i) => (
            <span
              key={`${sponsor}-${i}-${article.billNumber}`}
              data-bill-sponsor={sponsor}
            >
              {sponsor}
            </span>
          ))}
        </div>
        <div className={S.date}>
          <span className={S.title}>Date: </span>
          <span data-bill-status={pubDate}> {pubDate.toDateString()}</span>
        </div>

      </div>
      <div className={S.summary}>
        <span className={S.title}>Summary: </span>
        <p className={S.text} data-bill-summary={summary}>
          {summary} <Link data-bill-link={link} target="_blank" to={link}> read more
        </Link>
        </p>
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
