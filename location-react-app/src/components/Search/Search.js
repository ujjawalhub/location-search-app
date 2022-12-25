import React, { useState, useMemo, useEffect } from 'react';
import { useStateValue } from '../../StateContext';
import { actionTypes } from '../../reducer';

import debounce from 'lodash.debounce';
import Chip from '@material-ui/core/Chip';

import './Search.css';
import Items from '../Items/Items';
import useElasticAddData from '../../hooks/ElasticAddData';
import useElasticSearchData from '../../hooks/ElasticSearchData';
import useLocationSearch from '../../hooks/LocationSearch';
import Multiselect from 'multiselect-react-dropdown';



function Search() {

    const [{ }, dispatch] = useStateValue();
    
    const [options_, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMore, setIsMore] = useState(true);
    const [selected, setSelected] = useState([]);


    const [{ term }] = useStateValue();
    const { data } = useLocationSearch(term);
    const { esSearch } = useElasticSearchData(term);

    const [{ selection }] = useStateValue();
    const { esResult } = useElasticAddData(selection);


    const handleKeyPress = (value) => {
        if(!value) {
            document.getElementsByClassName("optionListContainer")?.[0]?.classList.add("displayNone")
            return
        };
        document.getElementsByClassName("optionListContainer")?.[0]?.classList.remove("displayNone")
        setLoading(true);
        // dispatch selection to trigger location search function
        dispatch({
            type: actionTypes.SET_SEARCH_TERM,
            term: value
        })
    }

    const onSelect = (value) => {
        if(!value || !value.length) return;
        // dispatch selection to trigger ElasticAdd function
        dispatch({
            type: actionTypes.SET_SELECTION_TERM,
            term: value[Array.from(value).length-1]
        })
        dispatch({
            type: actionTypes.SET_SELECTED_TERM,
            term: value
        })
        setSelected(value)
    }

    useEffect(() => {
        let ds = data||[];
        ds = ds.filter(x=> !esSearch.includes(x));
        setOptions(Array.from(esSearch||[]).concat(ds))
        setLoading(false);
    }, [data]);

    // adding location api data to es search data with filtering out existing one.
    useEffect(()=> {
        let ds = data||[];
        ds = ds.filter(x=> !esSearch.includes(x));
        setOptions(Array.from(esSearch||[]).concat(ds))
        setLoading(false);
    }, [esSearch])

    // deafult begaviour to focus input on page load
    useEffect(() => {
        window.onload = function() {
            setTimeout(()=> {
                document.getElementsByClassName("searchBox")[0].focus();
                document.getElementsByClassName("optionListContainer")?.[0]?.classList.add("displayNone")
            },300)
        }
    });

    // toggle isMore Chip
    const handleClick = ()=> {
        setIsMore(!isMore)
    }

    // debounce : current location plan has 2 request/seconds limit
    const debouncedChangeHandler = useMemo((event) => debounce(handleKeyPress, 500), []);
    
    return (
        <div>
            <div className="search">
                <Multiselect
                    options={options_}
                    onSearch={debouncedChangeHandler}
                    loading={loading}
                    isObject={false}
                    selectedValues={[]}
                    onSelect={onSelect}
                    placeholder="Search location..."
                    loadingMessage="Loading loacations..."
                />
            </div>
            <Items locations={selected} isMore={isMore} />
            {selected.length > 3  && (
                <div className="morechip">
                    <Chip
                        size='small'
                        onClick={handleClick}
                        label={isMore ? selected.length - 3 + ' more' : 'show less'}
                        style={{ maxWidth: 200, cursor: 'pointer' }} 
                    />
                </div>
            )}
            
        </div>
    )
}

export default Search;