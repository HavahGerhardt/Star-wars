import Pagination from "../components/Pagination";
import ListItem from "../components/ListItem";
import style from "./List.module.css";

/**
 * List component
 * Shows items list with pagination and a search bar
 * @param {*} props 
 * @returns 
 */
const List = (props) => {

    /**
     * On search word change
     * @param {*} event 
     */
    function searchChange(event) {
        props.setSearchWord(event.target.value);
    }

    return (
        <div>
            <h1 className={style.pageTitle}>{props.title}</h1>
            <div>
                {/* Search bar */}
                <input
                    className={style.searchBar + ' background-secondary'}
                    type="text"
                    placeholder="Search"
                    value={props.searchWord}
                    onChange={searchChange}
                />
            </div>
            {/* Items list or 'No result found' */}
            {props.list.length == 0 ? 
                <div className={style.noResult}><p>No result found</p></div> : 
                <div className={style.list}>
                    {props.list.map((item, index) => (
                        <div key={index} className={style.listItem}>
                            <ListItem itemType={item.type} item={item}/>
                        </div>
                    ))}
                </div>
            }
            {/* Pagination */}
            {props.totalPages > 1 && (
                <Pagination
                    currPage={props.currPage}
                    totalPages={props.totalPages}
                    listUrl={props.baseUrl}
                ></Pagination>
            )}
        </div>
    );
};

export default List;