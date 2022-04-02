<template>
  <div class="Item">
    <h2>{{ firstName + " " + lastName }}</h2>
    <img class="image" :src="image" />
    <div class="areas">
      <base-badge v-for="area in areas" :key="area" :customClass="area">{{
        area
      }}</base-badge>
    </div>
    <p class="disc">{{ description }}</p>
    <p class="rate">{{ hourRate + "$/hr" }}</p>
    <base-btn v-if="button" class="contact" :link="true" :to="`/contact/${id}`"
      ><font-awesome-icon icon="envelope" class="icon" />Contact</base-btn
    >
  </div>
</template>

<script>
export default {
  props: [
    "firstName",
    "lastName",
    "areas",
    "description",
    "hourRate",
    "id",
    "image",
    "button",
  ],
};
</script>

<style scoped>
.Item {
  flex: 1 0 calc(calc(100% / 2) - 10px);
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  margin: 10px 0px;
  display: grid;
  grid-template-columns: repeat(5, calc(20% - 20px));
  gap: 10px 20px;
  grid-template-areas:
    "head head head head headPic"
    "areas areas areas areas areas"
    "desc desc desc desc rate"
    ". . . contact contact";
  border: 1px solid #333;
  max-width: calc(calc(100% / 2) - 10px);
}
@media (max-width: 855px) {
  .Item {
    max-width: 100%;
  }
}
h2 {
  grid-area: head;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.image {
  grid-area: headPic;
  width: 64px;
  height: 64px;
  border-radius: 50%;
}
.areas {
  grid-area: areas;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px 0;
}
.disc {
  grid-area: desc;
  text-align: justify;
}
.rate {
  grid-area: rate;
  padding: 10px;
  background-color: aquamarine;
  height: fit-content;
  display: flex;
  justify-content: center;
  border-radius: 30px;
  width: fit-content;
}
.icon {
  margin-right: 2px;
}
.contact {
  border: 0;
  padding: 10px;
  grid-area: contact;
  text-decoration: none;
  position: relative;
  color: black;
  font-weight: bold;
  text-align: center;
}

.contact::before {
  content: "";
  position: absolute;
  width: 0;
  transition: all ease-in-out 0.2s;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid #0075ff;
}
.contact:hover::before {
  border-bottom: 1px solid #0075ff;
  width: 100%;
}
</style>
