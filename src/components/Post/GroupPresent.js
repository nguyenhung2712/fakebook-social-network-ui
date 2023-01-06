import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import UserService from "../../services/user.service";
const GroupPresent = ({data, user, callBack}) => {

    const [loading, setLoading] = useState("");

    const handleLeaveGroup = async (event) => {
        event.preventDefault();
        setLoading(true);
        await UserService.leaveGroup(data.id, user.id)
            .then((res) => {
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
        callBack(prev => !prev)
    }

    return (
        <>
            <figure>
                <Link to={"/group/" + data.id}>
                    <img src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.30497-1/116687302_959241714549285_318408173653384421_n.jpg?stp=cp0_dst-jpg_p74x74&_nc_cat=1&ccb=1-7&_nc_sid=70495d&_nc_ohc=sp5PrX0zZuEAX89RqQZ&tn=cQXMquC4Q5Z_u0g4&_nc_ht=scontent.fdad3-1.fna&oh=00_AfDB6mf1OcA2mqt7BNynbPCY5ocm_U88lS-DyA7oXAg1Wg&oe=63DEA443" alt=""/>
                </Link>
            </figure>
            <div className="page-meta">
                <Link to={"/group/" + data.id} className="underline">
                    {data.groupName}
                </Link>
            </div>
            <div className="page-likes">
                <ul className="nav nav-tabs likes-btn">
                    <li className="nav-item w-100">
                        <a 
                            className="bg-danger" href="#link1" data-toggle="tab" 
                            onClick={handleLeaveGroup}
                        >Leave</a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default GroupPresent