<template>
  <div :class="showFilter ? 'filter' : ''">
    <h2>
      Select Coach Critiria
      <font-awesome-icon
        icon="angle-down"
        @click="toggFilter"
        class="icon"
        :class="rotateIcon"
      />
    </h2>
    <transition>
      <div class="options" v-if="showFilter">
        <span class="filterOption">
          <input type="checkbox" id="frontend" checked @change="setFilter" />
          <label for="frontend">FrontEnd</label>
        </span>
        <span class="filterOption">
          <input type="checkbox" id="backend" checked @change="setFilter" />
          <label for="backend">BackEnd</label>
        </span>
        <span class="filterOption">
          <input type="checkbox" id="career" checked @change="setFilter" />
          <label for="career">Career</label>
        </span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  emits: ["filter-coaches"],
  data() {
    return {
      showFilter: false,
      rotateIcon: "",
      filter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    toggFilter() {
      this.showFilter = !this.showFilter;
      if (this.showFilter) {
        this.rotateIcon = "rotate";
      } else {
        this.rotateIcon = "";
      }
    },
    setFilter(e) {
      let id = e.target.id;
      let state = e.target.checked;
      this.filter[id] = state;
      this.$emit("filter-coaches", this.filter);
    },
  },
};
</script>

<style scoped>
.filter {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
}

input {
  margin: 0 10px;
}

.options {
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px 0;
}
.icon {
  transition: 0.5s all ease-in-out;
}
.rotate {
  transform: rotateX(180deg);
}
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
