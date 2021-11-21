import "./topbar.css";
import { Search} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import { useRef } from "react";
export default function Topbar() {
  const { user } = useContext(AuthContext);
  const {dispatch} = useContext(SearchContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const searchTxt=useRef();
  const SearchPeople=(e)=>{
    e.preventDefault();
    dispatch({type:"Search_People",payload:searchTxt.current.value})
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">CONNECT</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" onClick={SearchPeople}/>
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            ref={searchTxt}
          />
        </div>
      </div>
      <div className="topbarRight">
        {/* <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div> */}
        <Link to={`/profile/${user.username}`} style={{margin:'5px'}}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <span style={{color:'white',margin:'5px',fontSize:'20px'}}>{user.username}</span>
      </div>
    </div>
  );
}