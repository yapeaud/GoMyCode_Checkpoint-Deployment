import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./index.css";

const App = () => {
    const [bestShows, setBestShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data');
                console.log("data received: ", response.data[0]);
                setBestShows(response.data[0]);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Le tableau vide signifie que cela ne s'exécute qu'au montage

    if (loading) return <div>Chargement en cours...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div>
            <h1>Meilleures émissions</h1>
            <ul>
                {Object.keys(bestShows).map((cur, idx) => (
                    <li key={`${cur}-${idx}`}>
                        {cur} - {bestShows[cur]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;