import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import css from "./Newsfeed.module.css";

const supabase = createClient(
    "https://vsumrxhpkzegrktbtcui.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzdW1yeGhwa3plZ3JrdGJ0Y3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3OTU2NzUsImV4cCI6MjAwMDM3MTY3NX0.9lafalZT9FJW1D8DAuIMrsRX0Gs6204nV8ETfGslrqI"
);

const Newsfeed = () => {
    const [newsfeed, setNewsfeed] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [perPage] = useState(20);
    const [hasMore, setHasMore] = useState(true);
    const scrollableContainerRef = useRef(null); // Ref for the container

    async function fetchNewsfeed() {
        if (!hasMore || loading) return; // Stop fetching if no more data or already loading
        setLoading(true);
        const start = page * perPage;
        const { data, error, count } = await supabase
            .from("revisions_feed_view")
            .select("*", { count: 'exact' })
            .range(start, start + perPage - 1);

        if (error) {
            console.error(error);
            setLoading(false);
            return;
        }

        setNewsfeed((prevNewsfeed) => [...prevNewsfeed, ...data]);
        setPage(page + 1);
        setLoading(false);
        setHasMore(count > start + data.length);
    }

    useEffect(() => {
        fetchNewsfeed();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const scrollableContainer = scrollableContainerRef.current;
        const handleScroll = () => {
            if (!scrollableContainer) return;
            const { scrollTop, scrollHeight, clientHeight } = scrollableContainer;
            if (scrollTop + clientHeight >= scrollHeight - 5) { // Adjust as needed
                fetchNewsfeed();
            }
        };

        scrollableContainer.addEventListener('scroll', handleScroll);
        return () => scrollableContainer.removeEventListener('scroll', handleScroll);
    }, [newsfeed, loading]); // Include loading in dependencies

    return (
        <div>
            <h1>Newsfeed</h1>
            <div ref={scrollableContainerRef} className={css.scrollable_container}>
                {loading && <p>Loading...</p>}
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
                {hasMore && !loading && <p>Loading more...</p>}
            </div>
        </div>
    );
};

export default Newsfeed;
