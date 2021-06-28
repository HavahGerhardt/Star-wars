import { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import SWContext from "../store/sw-context";
import Modal from "./Modal";
import style from './ItemModal.module.css';

/**
 * Item modal component
 * @param {*} props 
 * @returns 
 */
const ItemModal = (props) => {
    // Holds references to other items that related to it
    const [links, setLinks] = useState({});
    const [item, setItem] = useState(props.item);
    const swContext = useContext(SWContext);

    /**
     * On item link click
     * @param {*} e 
     * @param {*} obj 
     */
    function onItemLinkClick(e, obj) {
        e.preventDefault();
        setItem(obj); // Replace current item with obj
    }

    /**
     * Get object from swapi and set it to the links hash
     * @param {*} referenceType The reference type name ('pilots', 'residents' etc.)
     * @param {*} url 
     */
    function getItemFromAPI(referenceType ,url) {
        swContext.fetchSWAPI(url) // Get item from swapi
        .then(data => 
            setLinks(prevLinks => {
                let obj = swContext.dataToObj(data); // Convert data to an object
                if(obj) {
                    if(prevLinks[referenceType] == undefined) { // Add referenceType hash (so we can add the object to it)
                        prevLinks[referenceType] = {};
                    }
                    prevLinks[referenceType][obj.id] = obj; // Add object to the reference type hash
                }
                return {...prevLinks};
            })
        )
        .catch(e => console.log('getItemFromAPI error', e))
    }

    // Get other items that related to this item (url references)
    useEffect(() => {
        setLinks({}); // Reset links
        // Go over item properties and check if it has some url references (so we can get them from swapi)
        for(let prop in item) {
            if(prop == 'id' || prop == 'url') // id/url properties is the current item url
                continue;
            let val = item[prop];

            // Get up to 5 items in an array
            if(Array.isArray(val)) {
                for(let i = 0 ; i < val.length && i < 5 ; i++) {
                    if(val[i].startsWith(swContext.apiUrl))
                        getItemFromAPI(prop, val[i]);
                }
            }
            else if((typeof(val) == "string") && val.startsWith(swContext.apiUrl)) {
                getItemFromAPI(prop, val);
            }
        }
    }, [item]);
    
    // Make an array of references name and theirs items links.
    let linksArr = Object.entries(links).map(([typeName, objsHash]) => {
        return <p key={typeName}>{typeName}: 
            {
                Object.entries(objsHash).map(([objId, obj]) => <a key={objId} className={style.itemLink} onClick={(e) => onItemLinkClick(e, obj)}>{obj.name}</a>)
            }
        </p>;
    });

    return <Modal>
        {/* Item info */}
        {item.detailedInfo()}
        {/* Links to other items that related to this */}
        {linksArr.map(jsx => jsx)}
        <div className={style.action}>
            <button className="btn-primary" onClick={swContext.closeModal}>Close</button>
            {/* Add/remove from favorites buttons */}
            {swContext.isFavorite(item) ? 
                <button className="removeFavorite btn btn-primary" onClick={() => swContext.removeFromFavorites(item)}>Remove from favorites</button> :
                <button className="addFavorite btn btn-primary" onClick={() => swContext.addToFavorites(item)}>Add to favorites</button>
            }
        </div>
    </Modal>;
}

export default ItemModal;