import './findfriends.css';
import {useEffect,useState,useContext} from 'react';
import api from '../../backApi';
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext';
import {Link} from 'react-router-dom';

export default function Findfriends(){
  const {search,dispatch} = useContext(SearchContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [users,setUsers]=useState([]);
    const [Allusers,setAllUsers]=useState([]);
    const {user}=useContext(AuthContext);
    useEffect(() => {
        try{
            const getUsers=async ()=>{
                const res=await api.get("/user/all");
                res.data=res.data.filter(fetchuser=>fetchuser.username!==user.username);
                dispatch({type:"Search_Reset"});
                // console.log(search);
                // console.log(res.data);
                setAllUsers(res.data);
            }
            getUsers();
        }
        catch(err){
            console.log(err);
        }
    }, [])
    useEffect(() => {
        if(search===""){
            setUsers(Allusers);
        }
        else{
            const newAllUsers=Allusers.filter((newUser)=>newUser.username===search);
            if(newAllUsers.length===0){
                setUsers([{username:"No User Found",profilePicture:''}]);
                return;
            }
            setUsers(newAllUsers);
        }
    }, [search,Allusers])
    return(
        <div className="findfriends">
            <div className="findfriendsWrapper">
            {
                users.map(fetchuser=>{
                    
                    return(
                        <Link to={`/profile/${fetchuser.username}`} style={{textDecoration:'none',color:'black'}} key={fetchuser._id}>
                        <div className="people" key={fetchuser.username}>
                            <img className='peopleImg' src={fetchuser.profilePicture!==""?PF+user.profilePicture:PF+"/person/noAvatar.png"} alt=""></img>
                            <span className='peopleName'>{fetchuser.username}</span>
                        </div>
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}