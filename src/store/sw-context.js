import { createContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import ItemModal from "../modals/ItemModal";
import { Film } from "../models/Film";
import { Person } from "../models/Person";
import { Planet } from "../models/Planet";
import { Species } from "../models/Species";
import { Starship } from "../models/Starship";
import { Vehicle } from "../models/Vehicle";

// Navigation array
const NAVS = [
    { type:'films', title: "Films" },
    { type:'people', title: "People" },
    { type:'planets', title: "Planets" },
    { type:'species', title: "Species" },
    { type:'vehicles', title: "Vehicle" },
    { type:'starships', title: "Starships" }
];

// The Star Wars api url
const SW_API = 'https://swapi.dev/api';

const SWContext = createContext({
    navs: NAVS,
    apiUrl: SW_API,
    favorites: {},
    isFavorite: (item) => {},
    addToFavorites: (item) => {},
    removeFromFavorites: (item) => {},
    favoritesCount: 0,
    dataToObj: (data) => {},
    fetchSWAPI: (url) => {},
    selectedItem: undefined,
    closeModal: () => {},
    openModal: (item) => {}
});

const localStorageKey = "sw-favorite-";

export function SWContextProvider(props) {
    const [favorites, setFavorites] = useState({});
    // Reference to an item that that user clicked "Show more info" (undefined means no item was selected)
    const [selectedItem, setSelectedItem] = useState(undefined);

    // Get favorites from local storage
    useEffect(() => {
        Object.keys(localStorage).forEach(function(key) {
            try {
                // We found an item with suffix 'sw-favorite-'
                if(key.startsWith(localStorageKey)) {
                    // Try to convert it to a json
                    let item = JSON.parse(localStorage.getItem(key));
                    // Item has mandatory fields, let's try to covert it to an object (Film, Person, etc.)
                    if(item["id"] && item["type"] && item["name"]) {
                        setFavorites(prevFavorites => {
                            let obj = dataToObj(item);
                            if(obj) // The object convert succeeded
                                prevFavorites[item.id] = obj;
                            
                            return {...prevFavorites}
                        });
                    }
                }
            }
            catch(e) {
                console.log('Get favorites error:', e)
            }
        });
    }, []);

    const context = {
        navs: NAVS,
        apiUrl: SW_API,
        favorites: favorites,
        isFavorite: isFavorite,
        addToFavorites: addToFavorites,
        removeFromFavorites: removeFromFavorites,
        favoritesCount: Object.keys(favorites).length,
        dataToObj: dataToObj,
        fetchSWAPI: fetchSWAPI,
        selectedItem: selectedItem,
        closeModal: closeModal,
        openModal: openModal
        
    };

    /**
     * Close modal
     */
     function closeModal() {
        setSelectedItem(undefined);
    }

    /**
     * Open modal
     * @param {*} item 
     */
    function openModal(item) {
        setSelectedItem(item);
    }

    /**
     * Add to favorites
     * @param {*} item 
     * @returns 
     */
    function addToFavorites(item) {
        if(!item.id)
            return;

        // Try to save item
        try {
            setFavorites(prevFavorites => {
                prevFavorites[item.id] = item;
                return {...prevFavorites};
            });
            localStorage.setItem(localStorageKey + item.id, JSON.stringify(item));
        }
        catch(e) {
            console.log('Save favorite error:', e)
        }
    }

    /**
     * Remove from favorites
     * @param {*} item 
     * @returns 
     */
    function removeFromFavorites(item) {
        if(!item.id)
            return;
        
        setFavorites(prevFavorites => {
            // Remove item entry from favorites hash
            delete prevFavorites[item.id]
            return {...prevFavorites};
        });

        // Remove item
        localStorage.removeItem(localStorageKey + item.id);
    }

    /**
     * Check if item exists in favorites hash
     * @param {*} item 
     * @returns 
     */
    function isFavorite(item) {
        return favorites.hasOwnProperty(item.id);
    }

    function clearUnknown(value) {
        if (value == "n/a" || value == "unknown") return "";
        return value;
    }
    
    /**
     * Convert data from swapi to an object (Film, Person, etc.)
     * @param {*} itemType
     * @param {*} data
     * @returns
     */
    function dataToObj(data) {
        // Clear unknown values
        for(let prop in data) {
            data[prop] = clearUnknown(data[prop]);
            // We don't want item without a name
            if((prop == 'name' || prop == 'title') && !data[prop])
                return false;
        }

        // Add id property (person/1, films/5, etc.)
        if(data["url"] && data.url.startsWith(SW_API)) {
            data.id = data.url.substr(SW_API.length + 1);
            data.type = data.id.split('/')[0];
        }

        switch (data.type) {
            case "films":
                return new Film(data);
            case "people":
                return new Person(data);
            case "planets":
                return new Planet(data);
            case "species":
                return new Species(data);
            case "starships":
                return new Starship(data);
            case "vehicles":
                return new Vehicle(data);
            default:
                return false;
        }
    }
    
    /**
     * Fetch swapi url and return the response.
     * @param {*} url
     * @returns Promise => resolve:JSON, reject:string
     */
    function fetchSWAPI(url) {
        // Fetch swapi
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => {
                if(response.ok)
                    // Process response and convert it to json
                    resolve(response.json());
                else {
                    // API throws error
                    let msg = response.statusText
                        ? response.statusText
                        : "Something went wrong, please try again later.";
                    reject(msg);
                }
            });
        });
    }

    return <SWContext.Provider value={context}>
        {props.children}
        {/* Show item modal */}
        {selectedItem && <ItemModal itemType={selectedItem.type} item={selectedItem} closeModal={closeModal}></ItemModal>}
    </SWContext.Provider>
};

export default SWContext;