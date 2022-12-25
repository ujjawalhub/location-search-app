import { useState, useEffect } from 'react';
import { ES_HOST } from '../keys';

const useElasticSearchData = (query) => {
    const [esSearch, setEsSearch] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if(!query) return;
            fetch(
                `${ES_HOST}search?query=${encodeURIComponent(query)}`,
                {
                    method: "GET", 
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(response => response.json())
            .then(result => {
                setEsSearch(Array.from(new Set(result)))
            })
        }
        fetchData();
    }, [query])

    return { esSearch };
}

export default useElasticSearchData; 