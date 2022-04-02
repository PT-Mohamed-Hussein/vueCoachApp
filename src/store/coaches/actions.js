class Coach {
  constructor(id, firstName, lastName, description, rate, areas, image) {
    (this.id = id),
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.description = description),
      (this.hourlyRate = rate),
      (this.areas = areas),
      (this.Image = image);
  }
  setId(id) {
    this.id = id;
  }
}

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = new Coach(
      "",
      data.first,
      data.last,
      data.desc,
      data.rate,
      data.areas,
      data.img
    );
    const token = context.rootGetters.userToken;
    const response = await fetch(
      `https://vuecoachapp-14284-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || " Fialed To Fetch !!");
      throw error;
    }
    coachData.setId(userId);
    context.commit("registerCoach", coachData);
  },
  async loadCoachesFromServer(context, payload) {
    if (!payload.forceUpdate && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      `https://vuecoachapp-14284-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || " Fialed To Fetch !!");
      throw error;
    }

    const Coaches = [];

    for (let k in responseData) {
      const myCoach = new Coach(
        k,
        responseData[k].firstName,
        responseData[k].lastName,
        responseData[k].description,
        responseData[k].hourlyRate,
        responseData[k].areas,
        responseData[k].Image
      );
      Coaches.push(myCoach);
    }

    context.commit("setCoachesFromServer", Coaches);
    context.commit("setTimeStamp");
  },
};
