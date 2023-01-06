import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";

import AuthService from '../../../services/auth.service';
import ConversationService from "../../../services/conver.service";

const ConverRoomAdd = ({ conver, onToggleChat, usersInChat, onShow, onSetOtherMemProfiles }) => {

    const user = AuthService.getCurrentUser();

    const form = useRef();
    /* const checkboxs = useRef([]); */

    const [friends, setFriends] = useState([]);
    const [membersID, setMembersID] = useState([]);
    /* const [isChecked, setIsChecked] = useState(false); */

    useEffect(() => {
        ConversationService.readOthersFriendNotJoined(conver.id, user.id)
            .then(res => {
                setFriends(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        return () => {
            setFriends([]);
            setMembersID([]);
        }
    }, []);

    /* useEffect(() => {
        checkboxs.current = checkboxs.current.slice(0, friends.length);
    }, [friends]); */

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!usersInChat) {
            ConversationService.addUserToConverRoom(conver.id, { membersID })
                .then(res => {
                    let profilesData = res.data;
                    profilesData.forEach(profile => {
                        onSetOtherMemProfiles(prev => [...prev, profile]);
                    });
                    onShow(prev => !prev);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            membersID.push(usersInChat.userID);
            membersID.push(usersInChat.otherUserID);
            ConversationService.createConversationRoom({ membersID })
                .then(res => {
                    onToggleChat();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    
    }

    const handleChange = ({target: {checked, value: checkedValue}}) => {
        if (checked) {
            setMembersID(prev => [...prev, parseInt(checkedValue)]);
        } else {
            setMembersID(prev => prev.filter(oldValue => oldValue !== parseInt(checkedValue)))
        }
        
    }

    return (
        <div className="modal-container">
            <div className="modal-main p-3 col-md-6 col-lg-4"> 
            <div className="border-bottom">
                <h3 className="text-center">{ usersInChat ? "Create room chat" : "Add members" }</h3>
                <button 
                    type="button" className="btn btn-secondary position-absolute" 
                    style={{top: "0px", right: "0px"}}
                    onClick={() => {
                        onShow(prev => !prev)
                    }}
                >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
            <Form ref={form}>
                <h4>Friends</h4>
                {
                    friends && friends.map((friend, index) => <div key={index} className="form-check">
                            <input 
                                /* ref={el => checkboxs.current[index] = el}  */
                                className="form-check-input" 
                                type="checkbox" 
                                value={friend.user.id}
                                onChange={handleChange}
                                id="flexCheckDefault" 
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                {friend.firstName} {friend.lastName}
                            </label>
                        </div>
                    )
                }
                <button 
                        type="button" 
                        className="btn btn-primary w-100" 
                        onClick={ handleSubmit }
                > { usersInChat ? "Create" : "Add" } </button>
            </Form>
            
            </div>
        </div>
    )
}

export default ConverRoomAdd