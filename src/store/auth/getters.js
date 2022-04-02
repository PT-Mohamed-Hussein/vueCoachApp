export default {
  userId(state) {
    return state.userId;
  },
  userToken(state) {
    return state.token;
  },
  isAuth(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
