import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    console.log('save token ' + token);
    window.sessionStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  },

  saveUsername(username) {
    console.log('save username');
    return window.sessionStorage.setItem('username', username);
  },

  clearUsername() {
    return window.sessionStorage.removeItem('username');
  },

  saveUserObj(obj) {
    console.log('save new current user');
    window.sessionStorage.setItem('userObj', JSON.stringify(obj));
  },

  clearUserObj() {
    return window.sessionStorage.removeItem('userObj');
  },

  saveTasksObj(obj) {
    window.sessionStorage.setItem('tasksObj', JSON.stringify(obj));
  },

  clearTasksObj() {
    return window.sessionStorage.removeItem('tasksObj');
  },

  savePostsObj(obj) {
    window.sessionStorage.setItem('postsObj', JSON.stringify(obj));
  }
};

export default TokenService;
