import React, { useEffect, useReducer, useState } from "react";
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {Alert} from './../UI/Alert/Alert';
import Peer from 'simple-peer';
import { CallPageHeader } from './../UI/CallPageHeader/CallPageHeader';
import { CallPageFooter } from './../UI/CallPageFooter/CallPageFooter';
import { MeetingInfo } from './../UI/MeetingInfo/MeetingInfo';
import { Messenger } from './../UI/Messenger/Messenger';
import { getRequest, postRequest } from './../../utils/apiRequest';
import { BASE_URL, GET_CALL_ID, SAVE_CALL_ID } from './../../utils/apiEndpoints';
import MessageLisReducer from './../../reducers/MessageLisReducer';
import './CallPage.scss';
import './CallPage.scss';

const initialState = [];
let peer = null;
const socket = io.connect(process.env.REACT_APP_BASE_URL);

export const CallPage = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const isAdmin = window.location.hash === "#init" ? true : false;
    const url = `${window.location.origin}${window.location.pathname}`;
    let alertTimeout = null;

    const [messageList, messageListReducer] = useReducer(
        MessageLisReducer,
        initialState
    );

    const [stremObj, setStremObj] = useState();
    const [screenCastStrem, setScreenCastStrem] = useState();
    const [meetingInfoPopup, setMeetInfoPopup] = useState(false);
    const [isPresenting, setIsPresenting] = useState(false);
    const [isMessanger, setIsMessanger] = useState(false);
    const [messageAlert, setMessageAlert] = useState({});
    const [isAudio, setIsAudio] = useState(true);

    React.useEffect(() => {
        if (isAdmin) {
            setMeetInfoPopup(true);
        }
        initWebRTC();
        socket.on("code", (data) => {
            peer.signal(data);
        });
    }, [isAdmin]);

    const getRecieverCode = async () => {
        const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
        if (response.code) {
            peer.signal(response.code);
        }
    };

    const initWebRTC = () => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
            .then((stream) => {
                setStremObj(stream);
                peer = new Peer({
                    initiator: isAdmin,
                    trickle: false,
                    stream: stream,
                });

                if (!isAdmin) {
                    getRecieverCode();
                }

                peer.on("signal", async (data) => {
                    if (isAdmin) {
                      let payload = {
                        id,
                        signalData: data,
                      };
                      await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
                    } else {
                      socket.emit("code", { code: data, url }, (cbData) => {
                        console.log("code sent");
                      });
          
                    }
                  });

                peer.on("connect", () => {
                    console.log('peer connected');
                });

                peer.on("data", (data) => {
                    clearTimeout(alertTimeout);
                    messageListReducer({
                        type: "addMessage",
                        payload: {
                            user: "other",
                            msg: data.toString(),
                            time: Date.now()
                        }
                    });

                    setMessageAlert({
                        alert:true,
                        isPopup:true,
                        payload: {
                            user: "other",
                            msg: data.toString()
                        }
                    });

                    alertTimeout = setTimeout(() => {
                        setMessageAlert({
                            ...messageAlert,
                            isPopup: false,
                            payload: {}
                        });
                    },10000);
                });

                peer.on("stream", (stream) => {
                    let video = document.querySelector("video");

                    if ("srcObject" in video) {
                        video.srcObject = stream;
                    } else {
                        video.src = window.URL.createObjectURL(stream);
                    }

                    video.play();
                });
            })
            .catch((ex) => {
                console.log(ex);
                console.log('error');
            });
    };

    const screenShare = () => {
        navigator.mediaDevices.getDisplayMedia({ cursor: true })
            .then((screenStrem) => {
                peer.replaceTrack(
                    stremObj.getVideoTracks()[0],
                    screenStrem.getVideoTracks()[0],
                    stremObj
                );
                setScreenCastStrem(screenStrem);
                screenStrem.getTracks()[0].onended = () => {
                    peer.replaceTrack(
                        stremObj.getVideoTracks()[0],
                        screenStrem.getVideoTracks()[0],
                        stremObj
                    );
                };
                setIsPresenting(true);
            });
    };

    const stopScreenShare = () => {
        screenCastStrem.getVideoTracks().forEach((track) => {
            track.stop();
        });
        peer.replaceTrack(
            screenCastStrem.getVideoTracks()[0],
            stremObj.getVideoTracks()[0],
            stremObj
        );
        setIsPresenting(false);
    };

    const toggleAudio = (value) => {
        stremObj.getAudioTracks()[0].enable = value;
        setIsAudio(value);
    };

    const disconnectCall = () => {
        peer.destroy();
        navigate(`/`);
        window.location.reload();
    };

    const sendMsg = (msg) => {
        peer.send(msg);
        messageListReducer({
            type: "addMessage",
            payload: {
                user: "you",
                msg: msg,
                time: Date.now()
            },
        });
    };

    return (
        <div className="callpage-container">
            <video className="video-container" src="" controls></video>
            <CallPageHeader
                isMessanger={isMessanger}
                setIsMessanger={setIsMessanger}
                messageAlert={messageAlert}
                setMessageAlert={setMessageAlert} 
            />
            <CallPageFooter
                isPresenting={isPresenting}
                stopScreenShare={stopScreenShare}
                screenShare={screenShare}
                isAudio={isAudio}
                toggleAudio={toggleAudio}
                disconnectCall={disconnectCall}
            />
            {isAdmin && meetingInfoPopup && <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />}
            {isMessanger ? (
                <Messenger setIsMessanger={setIsMessanger} sendMsg={sendMsg} messageList={messageList} />
            ) : (
                    messageAlert.isPopup && <Alert messageAlert={messageAlert} />
                )}

        </div>
    );
}