import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SWContext from "../store/sw-context";
import List from "../components/List";

/**
 * Favorites component
 * Gets and shows a list of 10 favorites items
 * @param {*} props 
 * @returns 
 */
const Favorites = () => {
    const LIMIT = 10;
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
    const [totalPages, setTotalPages] = useState(swContext.favoritesCount <= LIMIT ? 1 : Math.ceil(swContext.favoritesCount/10));

    // On page change
    useEffect(() => {
        // Make sure page number is valid
        page = isNaN(+page) || +page < 1 ? 1 : +page;
        if(page >= totalPages) {
            page = totalPages;
        }
        // Set current page
        if(page != currPage) {
            setCurrPage(page);
        }
    }, [page, totalPages]);
    
    // Holds the items list
    const [list, setList] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [currPage, setCurrPage] = useState(page);

    // Set a new list when favorites, search word or the current page was changed
    useEffect(() => {
        
        // Current page is invalid, set it to the last page
        if(currPage > totalPages) {
            setCurrPage(totalPages);
        }

        // Get filtered items array
        let filteredItem = Object.values(swContext.favorites)
        .filter(item => searchWord == '' || item.name.toLowerCase().includes(searchWord.toLowerCase()));

        let offset = (currPage-1)*LIMIT;
        setList(filteredItem.slice(offset, offset + 10));

        // Set total
        setTotalPages(filteredItem.length <= LIMIT ? 1 : Math.ceil(filteredItem.length/10));
    }, [searchWord, currPage, swContext.favorites]);
    
    return (
        <List baseUrl="favorites" list={list} totalPages={totalPages} searchWord={searchWord} currPage={currPage} title="Favorites" setSearchWord={(newSearchWord) => searchWordChange(newSearchWord)}/>
    );
};

export default Favorites;