import "./rightbar.css";
// import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import api from "../../backApi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  // console.log(followed);
  useEffect(() => {
    if(user===undefined){
      return;
    }
    let id=user._id;
    console.log(currentUser.following);
    const res=currentUser.following.includes(id);
    setFollowed(res);
    // console.log(res+":"+id);
  }, [followed,user])
  useEffect(() => {
    const getFriends = async () => {
      try {
        if(user===undefined||user._id===undefined){
          return;
        }
          const friendList = await api.get("/user/friends/" + user._id);
          setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    // alert(followed);
    try {
      if (followed) {
        const res=await api.put(`/user/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        if(res.status!=403){
          dispatch({ type: "UNFOLLOW", payload: user._id });
        }
      } else {
        const res=await api.put(`/user/${user._id}/follow`, {
          userId: currentUser._id,
        });
        // alert(res.status);
        if(res.status!=403){
          dispatch({ type: "FOLLOW", payload: user._id });
        }
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        {/* <div className="birthdayContainer">
          <img className="birthdayImg" src={PF+`gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div> */}
        <img className="rightbarAd" src={PF+`/person/ad.png`} alt="" />
        {/* <h4 className="rightbarTitle">Online Friends</h4> */}
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            key={friend._id}>
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}