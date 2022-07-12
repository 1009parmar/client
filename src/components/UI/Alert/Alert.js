import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faDivide } from '@fortawesome/free-solid-svg-icons';
import './Alert.scss';
export const Alert = ({messageAlert}) => {
    return (
        <div className="message-alert-popup">
            <div className="alert-header">
                <FontAwesomeIcon className="icon" icon={faCommentAlt} />
                <h3>{messageAlert.payload.user}</h3>
            </div>
            <p className="alert-msg">{messageAlert.payload.msg}</p>
        </div>
    )
}
