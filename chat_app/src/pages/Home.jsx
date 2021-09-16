import React from 'react';
import './home.css';
// import {Person} from '@material-ui/icons';
import Topbar from '../components/topbar/Topbar.jsx';
import Sidebar from '../components/sidebar/Sidebar.jsx';
import Feed from '../components/feed/Feed.jsx';
import Rigthbar from '../components/rightbar/Rightbar.jsx';
const Home=()=>{
    return(
        <>
        <Topbar/>
        <div className="homeContainer">
        <Sidebar/>
        </div>
        </>
    )
}
export default Home;
