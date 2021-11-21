import "./message.css";
import { format } from "timeago.js";
import {useState,useEffect } from 'react';
import api from '../../backApi';
export default function Message({ message, own }) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser]=useState(null);
  useEffect(() => {
    try{
      const getUser=async ()=>{
          const res=await api.get("/user?userId="+message.sender);
          // console.log(res.data);
          setUser(res.data);
      }
      getUser();
  }
  catch(err){
      console.log(err);
  }
    
  }, [message])
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={user?.profilePicture?PF+user.profilePicture:PF+`/person/noAvatar.png`}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt).toUpperCase()}</div>
     {/* <div className="messageBottom">{Date(message.createdAt)}</div>  */}
    </div>
  );
}