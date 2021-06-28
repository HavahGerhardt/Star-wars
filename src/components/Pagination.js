import { Link } from "react-router-dom";
import style from "./Pagination.module.css";

/**
 * Pagination component
 * @param {*} props 
 * @returns 
 */
const Pagination = (props) => {
    var pages = [];

    // Add previous button
    if(props.currPage > 1) {
        pages.push({
            num:props.currPage - 1,
            classes:style.pageItem,
            text:'<<'
        });
    }

    // Add 1...N page buttons
    for(let page=1; page<=props.totalPages ; page++) {
        var classes = style.pageItem;
        if(page == props.currPage) {
            classes += ' ' + style.active;
        }
        pages.push({
            num:page,
            classes:classes,
            text:page
        });
    }

    // Add 'next' button
    if(props.currPage < props.totalPages) {
        pages.push({
            num:props.currPage + 1,
            classes:style.pageItem,
            text:'>>'
        });
    }

    return (
        <div className={style.pagination}>
            {pages.map(page => 
                <div key={page.text} className={page.classes + ' background-secondary yellow'}>
                    <Link to={'/' + props.listUrl + '/' + page.num}>{page.text}</Link>
                </div>
            )}
        </div>
    );
};

export default Pagination;