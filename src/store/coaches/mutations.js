export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoachesFromServer(state, payload) {
    state.coaches = payload;
  },
  setTimeStamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
