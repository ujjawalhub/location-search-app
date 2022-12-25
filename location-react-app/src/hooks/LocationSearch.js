import { useState, useEffect } from 'react';
import { API_KEY } from '../keys';

const useLocationSearch = (term) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if(!term) return;
            fetch(
                `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${term}`
            ).then(response => response.json())
            .then(result => {
                if(result && result.length)
                    setData(result.map(x=> x.display_name ))
                else setData([])
            })
        }
        fetchData();
    }, [term])
    return { data };
}

export default useLocationSearch; 