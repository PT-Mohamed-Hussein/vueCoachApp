<template>
  <li>
    <base-card>
      <div class="mail">
        <span>From: </span>
        <a class="info" :href="'mailto:' + SenderEmail"> {{ SenderEmail }}</a>
      </div>
      <div>
        <p class="main">Content:</p>
        <div class="info">{{ Content }}</div>
      </div>
    </base-card>
  </li>
</template>

<script>
export default {
  props: ["SenderEmail", "Content"],
};
</script>

<style scoped>
li {
  list-style: none;
}
a.info {
  font-weight: bold;
}
.mail {
  margin: 10px 0;
}
p.main {
  margin: 10px 0;
}
div.info {
  border: 1px solid #333;
  padding: 10px;
  border-radius: 10px;
}
</style>
