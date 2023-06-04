import { Link } from 'react-router-dom'
import './entry.css'

const Entry = (props) => {
    const { article } = props
    const { billNumber, title, summary, link, tags, status, sponsors,} = article
    return (
        <article className="summary">
          <h2 data-bill-name={billNumber}>{billNumber}</h2>

          <section>
            <h3>Summary:</h3>
            <p data-bill-summary={summary}>
              {summary}
            </p>
          </section>

          <section className="bill-details">
            <h3>Details:</h3>
            <div>
              <span>Other info</span>
              {/* <span data-bill-date={pubDate}>{pubDate}</span> */}
              <Link data-bill-link={link} target="_blank" to={link}>Full Text</Link>
            </div>
          </section>
        </article>
    )
}

export default Entry;