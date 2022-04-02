class Message {
  constructor(email, content) {
    this.SenderEmail = email;
    this.MessageContent = content;
  }
  setId(id) {
    this.id = id;
  }
  setCoachId(id) {
    this.CoachId = id;
  }
}
export default {
  async AddNewMessage(context, data) {
    const messageData = new Message(data.Email, data.Content);
    const token = context.rootGetters.userToken;

    const response = await fetch(
      `https://vuecoachapp-14284-default-rtdb.europe-west1.firebasedatabase.app/messages/${data.cID}.json?auth=${token}`,
      {
        method: "POST",
        body: JSON.stringify(messageData),
      }
    );

    const responseData = await response.json();

    messageData.setId(responseData.name);
    messageData.setCoachId(data.cID);
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(responseData.message || " Fialed To Fetch !!");
      throw error;
    }
    context.commit("AddMessage", messageData);
  },
  async loadMessgaesFromServerSide(context) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.userToken;
    const response = await fetch(
      `https://vuecoachapp-14284-default-rtdb.europe-west1.firebasedatabase.app/messages/${userId}.json?auth=${token}`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || " Fialed To Fetch !!");
      throw error;
    }

    const messages = [];

    for (let k in responseData) {
      const message = {
        ...responseData[k],
        CoachId: userId,
        id: k,
      };
      messages.push(message);
    }
    context.commit("SetMessagesFromServer", messages);
  },
};
