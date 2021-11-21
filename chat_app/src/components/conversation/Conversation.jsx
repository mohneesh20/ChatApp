import './conversation.css';
import { useState,useEffect } from 'react';
import api from '../../backApi';
export default function Conversation({conversation,currentUser}){
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState("");
    // console.log(JSON.stringify(conversation));
    useEffect(() => {
        const friendId=conversation.members.find((m)=>m!==currentUser._id);
        try{
            const getUser=async ()=>{
                const res=await api.get("/user?userId="+friendId);
                // console.log(res.data);
                setUser(res.data);
            }
            getUser();
        }
        catch(err){
            console.log(err);
        }
    }, [currentUser,conversation]);
    return(
        <div className="conversation">
            <img className='conversationImg' src={user.profilePicture!==""?PF+user.profilePicture:PF+"/person/noAvatar.png"} alt=""></img>
            <span className='converstaionName'>{user.username}</span>
        </div>
    )
}