export default {
  getCoaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, __, rootGetters) {
    let coaches = getters.getCoaches;
    let userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const now = new Date().getTime();
    return (now - lastFetch) / 1000 > 60;
  },
};
