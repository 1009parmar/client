import React, { useEffect, useState } from 'react';
import './CallPageHeader.scss';
import {formatDate} from './../../../utils/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends,faCommentAlt,faUserCircle } from '@fortawesome/free-solid-svg-icons';

export const CallPageHeader = ({isMassenger,setIsMessanger,messageAlert,setMessageAlert}) => {
    let interval = null;
    const [currentTime,setCurrentTime] = useState(() => {
        return formatDate();
    });

    useEffect(() => {
        interval = setInterval(() => setCurrentTime(formatDate()),1000);
        return () => {
            clearInterval(interval);
        };
    },[interval]);
    return (
        <div className="frame-header">
            <div className="header-items icon-block">
                <FontAwesomeIcon className="icon" icon={faUserFriends}/>
            </div>
            <div className="header-items icon-block" onClick={() => {
                setIsMessanger(true);
                setMessageAlert({});
            }} >
                <FontAwesomeIcon className="icon" icon={faCommentAlt}/>
                {!isMassenger && messageAlert.alert && (
                    <span className="alert-circle-icon"></span>
                )}
            </div>
            <div className="header-items date-block">
                {currentTime}
            </div>
            <div className="header-items icon-block">
                <FontAwesomeIcon className="icon profile" icon={faUserCircle}/>
            </div>
        </div>
    )
}