import React, { useState, useEffect } from 'react';

import AuthService from '../../../services/auth.service';
import ConversationService from '../../../services/conver.service';
import ConverRoomAdd from './ConverRoomAdd';

const ConverRoomDetail = ({ conver, onToggleChat, otherProfiles, onSetOtherMemProfiles }) => {

    const user = AuthService.getCurrentUser();

    const [isEditedRoomName, setIsEditedRoomName] = useState(false);
    const [isShowed, setIsShowed] = useState(false);
    const [roomName, setRoomName] = useState(conver.name);

    useEffect(() => {
        return () => {
            setIsEditedRoomName(false);
            setIsShowed(false);
        }
    }, [])

    /* const roomNameRef = useRef(null);

    const setRef = useCallback(node => {
        roomNameRef.current = node
    }, []); */

    const handleToggleEditRoomName = (event) => {
        setIsEditedRoomName(prev => !prev);
    }

    const handleChangeRoomName = (event) => {
        let value = event.target.value;
        setRoomName(value);
    }

    const handleEditRoomName = (event) => {
        ConversationService.updateConversationRoom({name: roomName, status: 1}, conver.id)
            .then(res => {
                setIsEditedRoomName(false);
            })
            .catch(err => {

            });
    }

    const handleLeaveRoom = (event) => {
        event.preventDefault();

        if (window.confirm("Are u sure you want to leave this room chat?")) {
            ConversationService.removeUserFromConverRoom(conver.id, user.id)
                .then(res => {
                    onToggleChat();
                })
                .catch(err => {

                });
        }
    }
    
    const handleRemoveMember = (event, id) => {
        event.preventDefault();

        if (otherProfiles.length > 2) {
            if (window.confirm("Are u sure you want to remove this member?")) {
                ConversationService.removeUserFromConverRoom(conver.id, id)
                    .then(res => {
                        onSetOtherMemProfiles(prev => prev.filter(profile => profile.user.id !== id));
                    })
                    .catch(err => {
    
                    });
            }
        } else {
            if (window.confirm("Current member is 3. If you delete this mem, the group chat will automatically delete.")) {
                ConversationService.removeConversationRoom(conver.id)
                    .then(res => {
                        onToggleChat();
                    })
                    .catch(err => {

                    });
            }
            
        }
    }

    const handleRemoveRoom = (event) => {
        event.preventDefault();

        if (window.confirm("Are u sure you want to remove this room?")) {
            ConversationService.removeConversationRoom(conver.id)
                .then(res => {
                    onToggleChat();
                })
                .catch(err => {

                });
        }
    }

    return (
        <div className="card">
            {
                isShowed && 
                    <ConverRoomAdd
                        conver={conver}
                        onShow={setIsShowed}
                        onSetOtherMemProfiles={onSetOtherMemProfiles}
                    />
            }
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-primary btn-rounded" onClick={ onToggleChat }>
                        <i className="fa fa-arrow-left"></i>
                    </button>
                    <div className="dropdown">
                        <button className="btn btn-primary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a 
                                className="dropdown-item" 
                                href="#"
                                onClick={() => {
                                    setIsShowed(prev => !prev);
                                }}
                            >
                                <i className="fa fa-user-plus" aria-hidden="true"></i> Add member
                            </a>
                            <a 
                                className="dropdown-item" 
                                href="#"
                                onClick={ handleLeaveRoom }
                            >
                                <i className="fa fa-sign-out" aria-hidden="true"></i> Leave group
                            </a>
                            <a 
                                className="dropdown-item" 
                                href="#"
                                onClick={ handleRemoveRoom }
                            >
                                <i className="fa fa-times" aria-hidden="true"></i> Remove group
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    {
                        isEditedRoomName
                        ?   <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Group chat's name" 
                                    onChange={ handleChangeRoomName }
                                    value={ roomName }
                                />
                                <div className="input-group-append">
                                    <button 
                                        className="btn btn-outline-secondary" 
                                        type="button"
                                        onClick={ handleEditRoomName }
                                    >Edit</button>
                                </div>
                            </div>
                        : ""
                    }
                    <h3 
                        className="text-center"
                        style={{ cursor: 'pointer'}}
                        onClick={handleToggleEditRoomName}
                    >{ roomName }</h3>
                    <ul className="list-group p-0">
                        {
                            otherProfiles && otherProfiles.map((profile, index) => 
                                <li key={index} className="list-group-item">
                                    <div className="d-flex justify-content-between">
                                        <div>{profile.firstName} {profile.lastName}</div>
                                        <button 
                                            type="button" 
                                            className="btn btn-danger"
                                            onClick={ (event) => handleRemoveMember(event, profile.user.id) }
                                        ><i className="fa fa-times" aria-hidden="true"></i></button>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ConverRoomDetail;