<template>
  <header>
    <div>logo here</div>
    <nav>
      <base-btn mode="header" :link="true" to="/coaches"> Coaches </base-btn>
      <base-btn mode="header" :link="true" to="/requests" v-if="auth">
        My Requests
      </base-btn>
      <base-btn
        mode="header"
        :link="true"
        to="/register"
        v-if="!isCoach && auth"
      >
        Register As Coach
      </base-btn>
      <base-btn mode="header" :link="true" to="/auth" v-if="!auth">
        Login/Register
      </base-btn>
      <base-btn mode="header" :link="true" to="/" v-if="auth" @click="LogOut">
        Logout
      </base-btn>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    /*auth(){
            let currId = this.$store.getters.userId;
            let coaches = this.$store.getters['coaches/getCoaches']
            return coaches.find(coach => coach.id == currId)
        }*/ //one method
    auth() {
      return this.$store.getters.isAuth;
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
  },
  methods: {
    LogOut() {
      this.$store.dispatch("logout");
    },
  },
  async created() {
    await this.$store.dispatch("coaches/loadCoachesFromServer", {
      forceUpdate: true,
    });
  },
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  padding: 0.8rem;
  background-color: rgba(34, 34, 34, 0.85);
  width: 100%;
  justify-content: space-around;
}
header div {
  height: 100%;
  display: flex;
  align-items: center;
  width: 25%;
}
header nav {
  width: 75%;
  display: flex;
  justify-content: flex-end;
}
</style>
