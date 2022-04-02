export default {
  AddMessage(state, payload) {
    state.messages.push(payload);
  },
  SetMessagesFromServer(state, payload) {
    state.messages = payload;
  },
};
