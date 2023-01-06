import { useEffect, useState, useRef } from "react";
import {Link } from "react-router-dom";
import NotificationService from "../../services/notify.service";
import FriendService from "../../services/friend.service"
import { io } from 'socket.io-client';
import "./Notification.css"
import NotificationDetail from "./NotificationDetail";
import { useSelector } from "react-redux";
import ConversationService from "../../services/conver.service";
function NotificationList({currentUser,socket}){

    

    const [listNoti,setListNoti] = useState([])

    const [numberOfNewMessages,setNumberOfNewMessages] = useState(0)

    const [length,setLength] = useState(0)
    const [change,setChange] = useState(false)
    const dropdownRef = useRef()

    useEffect(() => {
        NotificationService.getByIdRecipient(currentUser.id).then(res => setListNoti(res.data));
        NotificationService.getLengthNewNotification(currentUser.id).then(res => setLength(res));
    },[change])

    useEffect(()=>{
        socket.on("getNotification",data=> {
            setListNoti((prev) => [...prev, data])
            NotificationService.getLengthNewNotification(currentUser.id).then(res => setLength(res));
        })

        socket.on("getMessNotification",data=> {
            if (data.includes(currentUser.id)) {
                ConversationService.getTotalNewMessage(currentUser.id)
                    .then(res => {
                        setNumberOfNewMessages(res.data);
                    });
            }
        })
    },[])

    useEffect(()=>{

        socket.on("getMessNotification",data=> {
            if (data.includes(currentUser.id)) {
                ConversationService.getTotalNewMessage(currentUser.id)
                    .then(res => {
                        setNumberOfNewMessages(res.data);
                    });
            }
        })
    },[numberOfNewMessages])


    const showNoti = () => {
        dropdownRef.current.classList.toggle("active")
        NotificationService.checkedAllNotificaiton().then(res => setChange(!change));
    }

    return (
        <>
        <li style={{marginTop:"12px"}}>
            <p className="notification" onClick={() => showNoti()}>
                <i className="ti-bell" ></i>{length > 0 && <span className="length-show">{length}</span>}
            </p>
            <div className="dropdowns dropdown-noti" ref={dropdownRef}>
                <ul className="drops-menu">
                {
                    listNoti && listNoti.map((noty,index) => 
                  
                    <NotificationDetail key={index} noty = {noty} handle={showNoti}/>
                    )
                }
                </ul>
            </div>
        </li>
        <li style={{marginTop:"10px"}}>
        <Link className="notification" to={"/conversation"} style={{fontSize:"22px"}} onClick={() => setNumberOfNewMessages(0)}>
            <i className="ti-comment" ></i>{numberOfNewMessages > 0 && <span className="length-show">{numberOfNewMessages}</span>}
        </Link>
      </li>
      </>
    );
}

export default NotificationList;