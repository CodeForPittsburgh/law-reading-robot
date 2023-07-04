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

        <div className={S.sponsors}>
          Sponsor{`${sponsors.length > 1 ? "s" : ""}`}:{" "}
          {sponsors.map((sponsor, i) => (
            <div
              key={`${sponsor}-${i}-${article.billNumber}`}
              data-bill-sponsor={sponsor}
            >
              {sponsor}
            </div>
          ))}
        </div>
        <div className={S.date}>
          <span data-bill-status={pubDate}>Date: {pubDate.toDateString()}</span>
        </div>
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
