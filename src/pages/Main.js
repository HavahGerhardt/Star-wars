import { Link } from 'react-router-dom';
import style from './Main.module.css';
/**
 * Main page
 * @returns 
 */
const Main = () => {
    return <div className={style.main + " background-secondary"}>
        <h2>Welcome to the Star Wars website!</h2>
        <p>We have all Star Wars data you've ever wanted:</p>
        <p><Link to="/planets">Planets</Link>, <Link to="/starships">Spaceships</Link>, <Link to="/vehicles">Vehicles</Link>, <Link to="/people">People</Link>, <Link to="/films">Films</Link> and <Link to="/species">species</Link></p> 
        <p>From all SEVEN Star Wars films</p>
    </div>;
}

export default Main;