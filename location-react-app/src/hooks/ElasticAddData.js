import { useState, useEffect } from 'react';
import { ES_HOST } from '../keys';

const useElasticAddData = (query) => {
    const [esResult, setEsResult] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if(!query) return;
            fetch(
                `${ES_HOST}add?query=${encodeURIComponent(query)}`,
                {
                    method: "GET", 
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(response => response.json())
            .then(result => {
                setEsResult(result)
            })
        }
        fetchData();
    }, [query])

    return { esResult };
}

export default useElasticAddData; 