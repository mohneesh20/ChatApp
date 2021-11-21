import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import api from '../../backApi';
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try{
        if(username){
          const res= await api.get("/post/profile/" + username);
          setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        }
        else{
          const res= await api.get("/post/timeline/"+user._id);
          setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        }
      }
      catch(err){
        console.log(err);
      }
    };
    fetchPosts();
  }, [username,user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p}/>
        ))}
      </div>
    </div>
  );
}