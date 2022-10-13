import React, { Component } from 'react';
import GithubServices from '../services/GithubServices';
import GistForks from './GistForks';

class GistsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            gists: []
        };
        this.refreshGists = this.refreshGists.bind(this);
    }

    componentDidMount() {
        this.refreshGists();
    }

    refreshGists() {
        GithubServices.getUserGists(this.state.username)
            .then(
                response => {
                    this.setState({gists : response.data})
                }
            )
    }

    getFormatedGist(gist) {
        let filesList = [];
        Object.keys(gist.files).forEach( key => {
            let file = gist.files[key]
            let language = file.language
            if (language === null || language === undefined) {
               language = "unknown"
            }
            filesList.push({
                filename: file.filename,
                language: language,
                url: file.raw_url
            })
        })

        let formatedGist = {
            id: gist.id,
            description: gist.description,
            files: filesList
        }

        return formatedGist;
    }

    render() {
        if (this.state.gists.length === 0)
            return (<div>LOADING...</div>)
        
        let gists = this.state.gists.map(gist => this.getFormatedGist(gist))
        return (
            <table>
                <thead>
                    <tr>
                        <td>Description</td>
                        <td>Files (Language)</td>
                        <td>Fork Users</td>
                    </tr>
                </thead>
                <tbody>
                {
                    gists.map( gist => {
                        return (
                            <tr key = {gist.id}>
                                <td>{gist.description}</td>
                                <td>
                                {   
                                    gist.files.map(file => {
                                        return (
                                            <div><a href={file.url}>{file.filename}</a><tag> ({file.language})</tag></div>
                                        )
                                    })
                                }
                                </td>
                                <td><GistForks gist_id={gist.id}/></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
}

export default GistsTable;