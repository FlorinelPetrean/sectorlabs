// import { Octokit } from "@octokit/core"
import axios from "axios";

// const octokit = new Octokit({ auth: "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" });
const axiosAuth = axios.create({ 
    headers: { 
      Authorization: "Bearer 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"
    } 
  });
const BASE_URL = 'https://api.github.com'

class GithubServices {

getUserGists(username) {
    let response = axiosAuth.get(`${BASE_URL}/users/${username}/gists`)
    return response;

}

getGistForks(gist_id) {
    let response = axiosAuth.get(`${BASE_URL}/gists/${gist_id}/forks`)
    return response;
}


} export default new GithubServices()