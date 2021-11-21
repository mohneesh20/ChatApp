import './messenger.css';
import Topbar from '../../components/topbar/Topbar.jsx';
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext';
import { useContext,useState,useEffect,useRef } from 'react';
import api from '../../backApi';
import {io} from 'socket.io-client';
const Messenger=()=>{
  const [conversations,setConversations]=useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {user}=useContext(AuthContext);
  const scrollRef = useRef();
  const socket = useRef();
  useEffect(()=>{
    try{
      const getConversation=async()=>{
        const res=await api.get("/conversations/"+user._id);
        setConversations(res.data);
      }
      getConversation();
    }
    catch(err){
      console.log(err);
    }
  },[user._id]);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.following.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);
  useEffect(()=>{
    try{
      const getMessages=async()=>{
        if(currentChat===null){
          return;
        }
        const res=await api.get("/messages/"+currentChat._id);
        setMessages(res.data);
      }
      getMessages();
    }
    catch(err){
      console.log(err);
    }
  },[currentChat]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleClick=async (e)=>{
      e.preventDefault();
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
    }
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try{
      const res=await api.post("/messages/",message);
      setMessages([...messages,res.data]);
    }
    catch(err){
      console.log(err);
    }
}
    return (
        <>
          <Topbar />
          <div className="messenger">
            <div className="chatMenu">
              <div className="chatMenuWrapper">
                <input placeholder="Search for friends" className="chatMenuInput" />
                {
                  conversations.map((conversation)=>{
                    return(
                      <div onClick={()=>setCurrentChat(conversation)} key={conversation._id}>
                        <Conversation  conversation={conversation} currentUser={user}/>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="chatBox">
              <div className="chatBoxWrapper">
                {currentChat ? (
                  <>
                    <div className="chatBoxTop">
                      {
                        messages.map(message=>{
                          return(
                            <div ref={scrollRef} key={message._id}>
                              <Message message={message} own={message.sender===user._id}/>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="chatBoxBottom">
                      <textarea
                        className="chatMessageInput"
                        placeholder="Enter Message Here...."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      ></textarea>
                      <button className="chatSubmitButton" onClick={handleClick}>
                        SEND
                      </button>
                    </div>
                  </>
                ) : ( 
                   <span className="noConversationText"> 
                     Open conversation to start a chat. 
                  </span> 
                 )} 
              </div>
            </div>
            <div className="chatOnline">
              <div className="chatOnlineWrapper">
                <ChatOnline
                  onlineUsers={onlineUsers}
                  currentId={user._id}
                  setCurrentChat={setCurrentChat}
                />
              </div>
            </div>
          </div>
        </>
      );
}
export default Messenger;