import MainNavigation from "./MainNavigation"
import style from './Layout.module.css';

/**
 * Layout component.
 * Wrap the navigation menu and routes.
 * @param {*} props 
 * @returns 
 */
const Layout = (props) => {
    return <div className={style.main + " background-primary"}>
        <MainNavigation/>
        <div className={style.container}>{props.children}</div>
    </div>;
}

export default Layout;