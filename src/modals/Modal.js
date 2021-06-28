import Card from '../Layout/Card';
import style from './Modal.module.css';

/**
 * Modal
 * @param {*} props 
 * @returns 
 */
const Modal = (props) => {
    return <Card>
        <div className={style.backdrop} >
            <div className={style.modal + ' background-secondary'}>
                {props.children}
            </div>
        </div>
    </Card>;
}

export default Modal;