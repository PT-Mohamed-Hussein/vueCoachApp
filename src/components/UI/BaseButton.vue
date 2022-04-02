<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :class="mode" :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: "base",
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
}
a.header {
  padding: 0.5rem 1rem;
  margin: 0 30px;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  color: white;
  position: relative;
}
a.header::before {
  content: "";
  position: absolute;
  width: 0;
  transition: all ease-in-out 0.2s;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid white;
  width: 100%;
}
a.header:hover::before {
  border-bottom: 1px solid #0075ff;
}
.router-link-active::before {
  border: 0 !important;
}
.router-link-active {
  height: 100%;
  color: white;
  border-bottom: 1px solid #0075ff !important;
}
.base {
  border: 0;
  padding: 10px;
  text-decoration: none;
  position: relative;
  color: black;
  font-weight: bold;
  text-align: center;
  background-color: transparent;
}

.base::before {
  content: "";
  position: absolute;
  width: 0;
  transition: all ease-in-out 0.2s;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid #0075ff;
}
.base:hover::before {
  border-bottom: 1px solid #0075ff;
  width: 100%;
}
.refresh {
  border: 0;
  padding: 10px 20px;
  text-decoration: none;
  position: relative;
  color: white;
  font-weight: bold;
  text-align: center;
  background-color: #0075ff;
  border-radius: 30px;
}

.refresh:hover {
  background-color: #0050ac;
}
</style>
