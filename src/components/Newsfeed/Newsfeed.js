import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import css from "./Newsfeed.module.css";
const supabase = createClient(
    "https://vsumrxhpkzegrktbtcui.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzdW1yeGhwa3plZ3JrdGJ0Y3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3OTU2NzUsImV4cCI6MjAwMDM3MTY3NX0.9lafalZT9FJW1D8DAuIMrsRX0Gs6204nV8ETfGslrqI");


// Newsfeed component

const Newsfeed = () => {
    // State to hold the newsfeed data
    const [newsfeed, setNewsfeed] = useState([]);
    // State to hold the loading status
    const [loading, setLoading] = useState(true);

    async function fetchNewsfeed() {
        // Fetch the newsfeed data from the database
        const { data, error } = await supabase
            .from("revisions_feed_view")
            .select("*")

        if (error) {
            console.error(error);
            return;
        }

        // Set the newsfeed data in the state
        setNewsfeed(data);
        // Set the loading status to false
        setLoading(false);
    }

    // Fetch the newsfeed data when the component mounts
    useEffect(() => {
        fetchNewsfeed();
    }, []);

    // Render the newsfeed data
    return (
        <div>
            <h1>Newsfeed</h1>
            <div className={css.scrollable_container}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {newsfeed.map((item) => (
                            <li key={item.revision_guid}>
                                <h3>
                                    <a href={item.full_text_link} target="_blank" rel="noreferrer">
                                        {item.revision_guid}
                                    </a>
                                </h3>
                                <p>{item.summary_text}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}

export default Newsfeed;