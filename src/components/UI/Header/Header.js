import './Header.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuestionCircle,
    faExclamationCircle,
    faCog,
} from "@fortawesome/free-solid-svg-icons";


const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Google_Meet_text_logo_%282020%29.svg" alt="Meet Icon" />
            </div>
            <div className="action-btn">
                <FontAwesomeIcon  className="icon-block" icon={faQuestionCircle} />
                <FontAwesomeIcon className="icon-block" icon={faExclamationCircle} />
                <FontAwesomeIcon className="icon-block" icon={faCog} />
            </div>
        </div>
    )
}

export default Header;