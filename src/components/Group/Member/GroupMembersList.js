import React, { useEffect, useState } from 'react';

import GroupService from '../../../services/group.service';
import UserService from '../../../services/user.service';
import AuthService from '../../../services/auth.service';
import GroupMember from './GroupMember';

const GroupMembersList = ({ data }) => {
    const user = AuthService.getCurrentUser();

    const [profiles, setProfiles] = useState([]);
    const [temp, setTemp] = useState(false);

    useEffect(() => {
        getMembersProfile(user.id, data.id)
            .then(res => {
                setProfiles(res.data)
            })
            .catch(err => {
                console.log(err);
            });
        return () => {
            setProfiles([]);
        }
    }, [temp])

    const getMembersProfile = async (userId, groupId) => {
        return await GroupService.readMembersProfile(userId, groupId);
    }

    const handleRemoveMember = (name, userId) => {
        if (window.confirm("Xác nhận xóa thành viên " + name + " ?")) {
            UserService.leaveGroup(data.id, userId)
                .then(res => {
                    setTemp(prev => !prev);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    return (
        <div className="col-lg-6">
            <div className="central-meta">
                <div className="frnds">
                    <div className="tab-content">
                        <div className="tab-pane active fade show " id="frends" >
                            <ul className="nearby-contct">
                                {
                                    profiles && 
                                        profiles.map((profile, index) => 
                                            <div key={ index }>
                                                <GroupMember 
                                                    profile={ profile }
                                                    removeMember={ handleRemoveMember }
                                                />   
                                            </div>
                                    )
                                }
                            </ul>
                            <div className="lodmore"><button className="btn-view btn-load-more"></button></div>
                        </div>
                    </div>
                </div>
            </div>	
        </div>
    )
}

export default GroupMembersList