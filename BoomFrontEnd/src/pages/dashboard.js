import React, {useContext, useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Sidebar from "../components/dashboard/sidebar";
import Mainbar from "../components/dashboard/mainbar";
import Listeningbar from "../components/dashboard/listeningbar";
import { MyLoginInfo } from "../app";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/dashboard/dashboard.css';
import {postUserResource} from '../services/user.service';
import {getSongsResource} from '../services/song.service';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
export const MyContext = React.createContext();
export const MySearch = React.createContext();
export const MyToggle = React.createContext();
export const MyPlaying = React.createContext();

const Dashboard = (props) => {
  const {getAccessTokenSilently} = useAuth0();
  // create a context
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState('Home');
  const [searchValue, setSearchValue] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [isPlaying, setisPlaying] = useState();
  const [userId, setuserId] = useContext(MyLoginInfo);
  const [userInfo, setuserInfo] = useState();
  const [songs, setSongs] = useState();

  useEffect(() => {
    (async() => {
    const token = await getAccessTokenSilently();
    console.log(token )
    const {data, error} = await postUserResource(token);
    setuserId(data.user._id);
    setuserInfo(data.user);
    const songsNeeded = await getSongsResource(token);
    setSongs(songsNeeded.data);
  })()
  }, [])
  return (
    <div className="dashbg">
      <div className="outer">
      <div className={`dashboard ${classes.root}`}>
        <Grid container>
          <Grid item xs={12} sm={2} className="sidebar">
            <MyContext.Provider value={[activeTab, setActiveTab]}>
              <Sidebar />
            </MyContext.Provider>
          </Grid>
          <Grid item xs={12} sm={7} style={{background: '#f7f8fa', paddingTop: '1em'}}>
            <MySearch.Provider value={[searchValue, setSearchValue]}>
              <MyToggle.Provider value={[isToggled, setIsToggled]}>
                <MyPlaying.Provider value={[isPlaying, setisPlaying]}>
                  <MyContext.Provider value={[activeTab, setActiveTab]}>
                    <Mainbar user={userInfo} songs={songs}/>
                  </MyContext.Provider>
                </MyPlaying.Provider>
              </MyToggle.Provider>
            </MySearch.Provider>
          </Grid>
          <Grid item xs={12} sm={3} >
            <MyPlaying.Provider value={[isPlaying, setisPlaying]}>
            <Listeningbar user={userInfo}/>
            </MyPlaying.Provider>
          </Grid>
        </Grid>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
