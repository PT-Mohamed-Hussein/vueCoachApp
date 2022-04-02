export default {
  getMessages(state) {
    return state.messages;
  },
  getLastMessageId(state) {
    let lastMessage = state.messages[state.requests.length];
    return parseInt(lastMessage.substring(1));
  },
};
