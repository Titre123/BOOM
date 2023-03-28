import React, {useContext, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Sidebar from "../components/dashboard/sidebar";
import Mainbar from "../components/dashboard/mainbar";
import Listeningbar from "../components/dashboard/listeningbar";
import { MyLoginInfo } from "../app";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/dashboard/dashboard.css';
import { getNewUserResource } from "../services/message.service";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
export const MyContext = React.createContext();
export const MySearch = React.createContext();
export const MyToggle = React.createContext();

const Dashboard = (props) => {
  const {getAccessTokenSilently} = useAuth0();
  // create a context
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState('Home');
  const [searchValue, setSearchValue] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [userId, setuserId] = useContext(MyLoginInfo);
  (async () => {
    const token = await getAccessTokenSilently();
    console.log(token);
    const {data, error} = await getNewUserResource(token);
    setuserId(data._id);
  })()
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
          <Grid item xs={12} sm={7} style={{border: '1px solid #000', background: '#f7f8fa', paddingTop: '1em'}}>
            <MySearch.Provider value={[searchValue, setSearchValue]}>
              <MyToggle.Provider value={[isToggled, setIsToggled]}>
                <Mainbar />
              </MyToggle.Provider>
            </MySearch.Provider>
          </Grid>
          <Grid item xs={12} sm={3} style={{border: '1px solid #000'}}>
            <Listeningbar />
          </Grid>
        </Grid>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
