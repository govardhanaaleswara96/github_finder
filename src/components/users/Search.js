import React, { useState, useContext } from 'react'
import githubContext from '../../context/github/githubContext';
import alertContext from '../../context/alert/alertContext';
const Search = () => {
    const GithubContext = useContext(githubContext);
    const AlertContext = useContext(alertContext)

    const { clearUsers, searchUsers } = GithubContext;
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            AlertContext.setAlert('Please Enter Something', 'light');
        }
        else {
            searchUsers(text);
            setText("")
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text"
                    name="text"
                    placeholder="Search users..."
                    value={text}
                    onChange={onChange}
                />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {
                GithubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={clearUsers}
                >Clear</button>
            }
        </div>
    )
}

export default Search
