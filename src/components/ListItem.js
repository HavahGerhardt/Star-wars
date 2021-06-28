import { useContext } from "react";
import Card from "../Layout/Card";
import SWContext from "../store/sw-context";
import style from './ListItem.module.css';

/**
 * List item
 * Present an item in a list
 */
const ListItem = (props) => {
    const swContext = useContext(SWContext);
    
    return <Card>
        {/* Show short info about this item */}
        {props.item.shortInfo()}
        <div className={style.action}>
            <button className="btn btn-primary" onClick={() => swContext.openModal(props.item)}>Show more info</button>
            {/* Add to favorites or it remove */}
            {swContext.isFavorite(props.item) ? 
                <button className="removeFavorite btn btn-primary" onClick={() => swContext.removeFromFavorites(props.item)}>Remove from favorites</button> :
                <button className="addFavorite btn btn-primary" onClick={() => swContext.addToFavorites(props.item)}>Add to favorites</button>
            }
        </div>
    </Card>;
}

export default ListItem;