import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { useContext } from "react";
import {Link} from 'react-router-dom';
// import CloseFriend from "../closeFriend/Closefriend";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
export default function Sidebar() {
  const {dispatch}=useContext(AuthContext);
  const history=useHistory();
  const logout=async()=>{
    try{
      await localStorage.removeItem("user");
      dispatch({type:"LOGOUT"});
      history.push('/');
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
        <Link to="/" style={{textDecoration:'none',color:'black'}}>
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          </Link>
          <Link to="/messenger" style={{textDecoration:'none',color:'black'}}>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          </Link>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton" onClick={logout}>LOGOUT</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
        </ul>
      </div>
    </div>
  );
}