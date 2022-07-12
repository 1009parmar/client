import Header from '../UI/Header/Header';
import './HomePage.scss';
import './../UI/Header/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faVideo,
    faKeyboard
} from "@fortawesome/free-solid-svg-icons";
import shortid from 'shortid';
import {useNavigate} from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate();
    const startCall = () => {
        //generate unick id
        const uid = shortid.generate();
        // redirect to new page
        navigate(`/${uid}#init`);
    }


    return (
        <div className="home-page">
            <Header />
            <div className="body">
                <div className="left-side">
                    <div className="content">
                        <h2>Premium video meeting. Now free for everyone.</h2>
                        <p>We re-engineered the service we built for secure business meetings, Google Meet, to make it free and available for all.</p>
                        <div className="action-btn">
                            <button className="btn green" onClick={startCall}>
                                <FontAwesomeIcon className="icon-block" icon={faVideo} />
                                New Meeting
                            </button>
                            <div className="input-block">
                                <div className="input-section">
                                    <FontAwesomeIcon className="icon-block" icon={faKeyboard} />
                                    <input placeholder="Enter a code or link" />
                                </div>
                                <button className="btn no-bg">Join</button>
                            </div>
                        </div>
                    </div>
                    <div className="help-text">
                        <a href="">Learn more</a> about Google Meet
                    </div>
                </div>
                <div className="right-side">
                    <div className="content">
                        <img src="https://www.gstatic.com/meet/user_edu_brady_bunch_light_81fa864771e5c1dd6c75abe020c61345.svg" alt="Google Meet Icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage;