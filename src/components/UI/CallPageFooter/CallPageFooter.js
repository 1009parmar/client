import React from 'react';
import './CallPageFooter.scss';
import { faVideo, faMicrophone, faPhone, faAngleUp, faClosedCaptioning, faDesktop, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const CallPageFooter = ({isPresenting,screenShare,stopScreenShare,isAudio,toggleAudio,disconnectCall}) => {
    return (
        <div className="footer-item">
            <div className="left-item">
                <div className="icon-block">
                    Meeting details
                    <FontAwesomeIcon className="icon" icon={faAngleUp} />
                </div>
            </div>
            <div className="center-item">
                <div className={`icon-block ${isAudio ? "red-bg" : null}`} onClick={() => toggleAudio(!isAudio)}>
                    <FontAwesomeIcon className="icon" icon={isAudio ? faMicrophone : faMicrophoneSlash} />
                </div>
                <div className="icon-block red-bg" onClick={disconnectCall}>
                    <FontAwesomeIcon className="icon" icon={faPhone} />
                </div>
                <div className="icon-block">
                    <FontAwesomeIcon className="icon" icon={faVideo} />
                </div>
            </div>
            <div className="right-item">
                <div className="icon-block">
                    <FontAwesomeIcon className="icon"  icon={faClosedCaptioning} />
                    <p className="title">Turn on captions</p>
                </div>
                {isPresenting ? (
                    <div className="icon-block" onClick={stopScreenShare}>
                        <FontAwesomeIcon className="icon"  icon={faDesktop} />
                        <p className="title">stop Presenting</p>
                    </div>
                ): (
                    <div className="icon-block" onClick={screenShare}>
                        <FontAwesomeIcon className="icon"  icon={faDesktop} />
                        <p className="title">Present now</p>
                    </div>
                )}
            </div>
        </div>
    )
}