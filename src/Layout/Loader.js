import style from './Loader.module.css';

/**
 * Loader component
 * Use to show a loading spinner
 * @returns 
 */
const Loader = () => {
    return <div className={style.loader}>
        <div className={style.spinner}></div>
    </div>;
}

export default Loader;