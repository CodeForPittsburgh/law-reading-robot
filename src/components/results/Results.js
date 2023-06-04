import './entry.css'
import Entry from "./Entry";

const Results = (props) => {
    const { articles } = props
    return (

        <section className='summaries'>
            <h1>Bills</h1>
            {
                articles.map((article) => {
                    return  <li key={article.billNumber}>
                                <Entry article={article}/>   
                            </li>
                })
            }
        </section>
    )
}

export default Results;