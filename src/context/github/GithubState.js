import React, { useReducer } from "react";
import axios from 'axios';
import githubContext from "./githubContext";
import githubReducer from "./githubReducer";
import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_Client_ID;
    githubClientSecret = process.env.REACT_APP_Client_Secrets;
}
else {
    githubClientId = process.env.Client_ID;
    githubClientSecret = process.env.Client_Secrets;
}
const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
    const [state, dispatch] = useReducer(githubReducer, initialState);
    // Search Users
    const searchUsers = async (text) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    };
    //Get Users
    const getUser = async (login) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${login}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    }
    //Clear Users
    const clearUsers = () => {
        dispatch({
            type: CLEAR_USERS,
        });
    }
    //Get Repos
    const getUserRepos = async (login) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&
      client_id=${githubClientId}&client_secret=${githubClientSecret}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    }
    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING })

    return <githubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            getUser,
            getUserRepos,
            clearUsers
        }}
    >
        {props.children}
    </githubContext.Provider>
}
export default GithubState;