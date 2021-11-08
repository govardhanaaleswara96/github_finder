import { Component } from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  }
  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_Client_ID}&client_secret=${process.env.REACT_APP_Client_Secrets}`);
  //   this.setState({ users: res.data, loading: false });
  // }
  // search github users
  searchUsers = async (e) => {
    console.log(e);
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${e}&client_id=${process.env.REACT_APP_Client_ID}&client_secret=${process.env.REACT_APP_Client_Secrets}`);
    console.log(res.data.items)
    this.setState({ users: res.data.items, loading: false });
  }
  //clear users
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  }
  //set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);

  }
  render() {
    const { users, loading } = this.state;
    return (
      <div className="App">
        <Navbar />
        <Alert alert={this.state.alert} />
        <div className="container">
          <Search setAlert={this.setAlert} showClear={this.state.users.length > 0 ? true : false} searchUsers={this.searchUsers} clearUsers={this.clearUsers} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}
export default App;
