import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import UserService from "../../services/user.service";
import GroupService from "../../services/group.service";

const Group = ({ data, user, callBack }) => {

    const [totalMembers, setTotalMembers] = useState(0);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        GroupService.readTotalMembersById(data.id)
            .then(res => {
                setTotalMembers(res.data);
            })
            .catch(err => {

            })
    }, [loading])

    const handleJoinGroup = async (event) => {
        event.preventDefault();
        setLoading(true);
        await UserService.joinGroup(data.id, user.id)
            .then((res) => {
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
        callBack(prev => !prev)
    }

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
        <div className="nearly-pepls">
            <figure>
                <Link to={`/group/${data.id}`}>
                    <img src="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3" alt="" />
                </Link>
            </figure>
            <div className="pepl-info">
                
                <h4><Link to={`/group/${data.id}`}>
                    { data.groupName }
                </Link></h4>
                <span>(public-private)</span>
                <em>{ totalMembers } thành viên</em>
                {
                    data.isJoined 
                        ? <a href="#" title="" className="add-butn bg-danger" data-ripple="" 
                            onClick={ handleLeaveGroup }
                        >Leave group</a>
                        : <a href="#" title="" className="add-butn" data-ripple="" 
                            onClick={ handleJoinGroup }

                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            Join now</a>
                }
                
                
            </div>
        </div>
    )
}

export default Group;