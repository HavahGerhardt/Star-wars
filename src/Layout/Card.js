import style from './Card.module.css';

/**
 * Card component
 * @param {*} props 
 * @returns 
 */
const Card = (props) => {
    return <div className={style.card + ' background-secondary'}>{props.children}</div>
}

export default Card;