import { useContext } from "react";
import { Link } from "react-router-dom";
import SWContext from "../store/sw-context";
import Card from "./Card";
import style from "./MainNavigation.module.css";

/**
 * Main navigation component
 * @returns 
 */
const MainNavigation = () => {
    const swContext = useContext(SWContext);

    return <Card>
        <div className={style.navigation}>
            <h1><Link className="yellow" to="/">Star Wars</Link></h1>
            <div className={style.menu}>
                {/* Links like: Films, Pepople, etc. */}
                {swContext.navs.map((navItem, index) => (
                    <Link key={index} className={style.link + ' yellow'} to={'/' + navItem.type}>{navItem.title}</Link>
                ))}
                {/* Favorites link */}
                {swContext.favoritesCount > 0 && <Link className={style.link + ' yellow'} to="/favorites">Favorites ({swContext.favoritesCount})</Link>}
            </div>
        </div>
    </Card>;
};

export default MainNavigation;
