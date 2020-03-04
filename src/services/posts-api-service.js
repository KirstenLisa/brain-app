import config from '../config';
import TokenService from '../services/token-service';

const PostsApiService = {
  getPosts() {
    return fetch(`${config.API_ENDPOINT}/posts`, {
      headers: {
        'content-type': 'application/json',
        //authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getUserPosts(userId) {
    return fetch(`${config.API_ENDPOINT}/posts/${userId}`, {
      headers: {
        'content-type': 'application/json',
        //authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

getPost(userId, postId) {
    return fetch(`${config.API_ENDPOINT}/posts/${userId}/${postId}`, {
      headers: {
        'content-type': 'application/json',
        //authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  deletePost(userId, postId) {
    return fetch(`${config.API_ENDPOINT}/posts/${userId}/${postId}`, {
      method: 'DELETE',
      // headers: {
      //   authorization: `bearer ${TokenService.getAuthToken()}`
      // }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  updatePost(userId, postId, updatedPost) {
    return fetch(`${config.API_ENDPOINT}/posts/${userId}/${postId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        //authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(updatedPost)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  addPost(newPost) {
    console.log(newPost);
    return fetch(`${config.API_ENDPOINT}/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        //authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(newPost)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
};

export default PostsApiService;