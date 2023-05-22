import { Link } from 'react-router-dom'
import './entry.css'

const Entry = (props) => {
    const { article } = props
    const { billName, billSummary} = article
    return (
        <article class="summary">
          <h2 data-bill-name={billName}>{billName}</h2>

          <section>
            <h3>Summary:</h3>
            <p data-bill-summary={billSummary}>
              {billSummary}
            </p>
          </section>

          <section class="bill-details">
            <h3>Details:</h3>
            <div>
              <span>Other info</span>
              <span data-bill-date={billDate}>{billDate}</span>
              <Link data-bill-link={billLink} target="_blank" to={billLink}>Full Text</Link>
            </div>
          </section>
        </article>
    )
}