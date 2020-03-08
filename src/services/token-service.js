import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    console.log(token);
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
    return window.sessionStorage.setItem('username', username);
  },

  clearUsername() {
    return window.sessionStorage.removeItem('username');
  },

  saveUserObj(obj) {
    window.sessionStorage.setItem('userObj', JSON.stringify(obj));
  },

  saveTasksObj(obj) {
    window.sessionStorage.setItem('tasksObj', JSON.stringify(obj));
  },

  savePostsObj(obj) {
    window.sessionStorage.setItem('postsObj', JSON.stringify(obj));
  }
};

export default TokenService;
