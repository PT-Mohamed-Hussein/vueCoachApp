<template>
  <span class="area" :class="customClass">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    customClass: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style scoped>
.area {
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  margin-right: 0.5rem;
  background-color: #ccc;
  color: #252525;
  width: fit-content;
  box-sizing: content-box;
}

.frontend {
  background-color: #3d008d;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>
