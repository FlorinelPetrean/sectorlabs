import React, { Component } from 'react';
import GithubServices from '../services/GithubServices';
import "../styles.css";

class GistForks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gist_id: props.gist_id,
            forks: []
        }
        this.refreshForks = this.refreshForks.bind(this)
    }

    componentDidMount() {
        this.refreshForks();
    }

    refreshForks() {
        GithubServices.getGistForks(this.state.gist_id)
            .then(
                response => {
                    this.setState({forks : response.data})
                }
            )
    }


    getGistUser(fork) {
        let user = {
            username: fork.owner.login,
            avatar: fork.owner.avatar_url
        }
        return user;
    }

    render() {
        if (this.state.forks.length === 0)
            return (<div></div>)
        let forkUsers = this.state.forks.map(fork => this.getGistUser(fork))
        return(
            <div>
                {
                    forkUsers.map(user => {
                        return(
                            <div>
                                <div>{user.username}</div>
                                <div><img className='photo' src={user.avatar} alt="avatar"/></div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }


} export default GistForks;
