<template>
  <div class="container">
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheHeader from "./components/UI/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
  watch: {
    didAutoLogout(curVal, oldVal) {
      if (curVal && curVal !== oldVal) {
        this.$router.replace("/");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  min-height: 100vh;
  width: 100%;
}
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.psudoCont {
  height: 100%;
  display: flex;
  justify-content: center;
  width: 80%;
}
</style>
