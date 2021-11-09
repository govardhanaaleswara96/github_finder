import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);
  // get user by login
  const getUser = async (login) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_Client_ID}&client_secret=${process.env.REACT_APP_Client_Secrets}`);
    setUser(res.data)
    setLoading(false);
  }
  // get repos by login
  const getUserRepos = async (login) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&
      client_id=${process.env.REACT_APP_Client_ID}&client_secret=${process.env.REACT_APP_Client_Secrets}`);
    setRepos(res.data);
    setLoading(false);
  }
  //clear users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }
  //set alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search showAlert={showAlert}
                    showClear={users.length > 0 ? true : false}
                    clearUsers={clearUsers} />
                  <Users loading={loading}
                    users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login'
                render={props => (
                  <Fragment>
                    <User {...props}
                      getUserRepos={getUserRepos}
                      repos={repos}
                      getUser={getUser}
                      user={user}
                      loading={loading} />
                  </Fragment>
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}
export default App;
