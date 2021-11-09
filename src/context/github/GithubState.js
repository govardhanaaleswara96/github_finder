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
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_Client_ID}&client_secret=${process.env.REACT_APP_Client_Secrets}`);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    };
    //Get Users
    //Clear Users
    //Get Repos
    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING })

    return <githubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers
        }}
    >
        {props.children}
    </githubContext.Provider>
}
export default GithubState;