import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Layout/Loader";
import SWContext from "../store/sw-context";
import style from './ItemsList.module.css';
import List from "../components/List";

/**
 * Items list component
 * Gets and shows a list of 10 item for a specific item type (films, people etc.)
 * @param {*} props 
 * @returns 
 */
const ItemsList = (props) => {
    const swContext = useContext(SWContext);

    /**
     * On search word change
     * @param {*} newSearchWord 
     */
    function searchWordChange(newSearchWord) {
        setSearchWord(newSearchWord);
        setCurrPage(1); // Reset current page to 1
    }

    // Get the 'page' router param
    let { page } = useParams();
    page = isNaN(+page) || +page < 1 ? 1 : +page; // Make sure page is a valid number
    
    // Should we show a loading spinner?
    const [isLoading, setIsLoading] = useState(true);
    // Holds the items list
    const [list, setList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [searchWord, setSearchWord] = useState("");
    const [currPage, setCurrPage] = useState(page);
    const [errorMsg, setError] = useState('');

    // Set the page number in case it was changed
    useEffect(() => {
        if(currPage != page && page <= totalPages)
            setCurrPage(page);
    },[page])

    

    // Get items from swapi on initialize, or when the search/page/type have been changed
    useEffect(() => {
        // Api url
        var apiUrl = `${swContext.apiUrl}/${props.type}?page=${currPage}`;
        // Add search word to url
        if(searchWord) 
            apiUrl += `&search=${searchWord}`;
        
        // Fetch url and get data as json
        swContext.fetchSWAPI(apiUrl)
        .then((data) => {
            // Count how many pages do we have
            let totalPages = isNaN(+data.count) && +data.count < 1 ? 1 : Math.ceil(+data.count / 10);

            // Convert data to objects
            let tmpList = [];
            for(let item of data.results) {
                let obj = swContext.dataToObj(item);
                if(obj)
                    tmpList.push(obj);
            }

            setList(tmpList); // Set array of items
            setIsLoading(false); // Remove loading spinner
            setTotalPages(totalPages); // Set the new total pages
            setError(''); // Clear error message
        })
        .catch((err) => { // Ops, we got an error...
            setError(err); // Set error
            console.log(`fetch(${apiUrl}) error:`,err);
        });
    }, [props.type, currPage, searchWord]);

    // Show error message
    if(errorMsg != '') {
        return <div className={style.error}>{errorMsg}</div>;
    }

    // Show loading spinner
    if (isLoading) {
        return <Loader/>;
    }

    return (
        <List baseUrl={props.type} list={list} totalPages={totalPages} searchWord={searchWord} currPage={currPage} title={props.title} setSearchWord={(newSearchWord) => searchWordChange(newSearchWord)}/>
    );
};

export default ItemsList;