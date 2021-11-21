import './people.css';
import React from 'react';
import Topbar from '../../components/topbar/Topbar.jsx';
import Sidebar from '../../components/sidebar/Sidebar.jsx';
import FindFriends from '../../components/findfriends/Findfriends';
import Rigthbar from '../../components/rightbar/Rightbar.jsx';
export default function People(){
    return(
        <>
        <Topbar/>
        <div className="peopleContainer">
        <Sidebar/>
        <FindFriends/>
        <Rigthbar/>
        </div>
        </>
    )
}