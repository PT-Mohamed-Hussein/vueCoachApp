<template>
  <div class="psudoCont">
    <base-dialog :show="!!error" title="Erorr Occured!" @close="handelError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <h2>Requested Received</h2>
      <hr />
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="messages.length > 0">
        <the-request
          v-for="message in messages"
          :key="message.id"
          :SenderEmail="message.SenderEmail"
          :Content="message.MessageContent"
        ></the-request>
      </ul>
      <h4 v-else>You Havent Received Any Requests</h4>
    </base-card>
  </div>
</template>

<script>
import TheRequest from "../../components/requests/TheRequest.vue";
import BaseSpinner from "../../components/UI/BaseSpinner.vue";
import BaseDialog from "../../components/UI/BaseDialog.vue";
export default {
  components: {
    TheRequest,
    BaseSpinner,
    BaseDialog,
  },
  data() {
    return {
      messages: [],
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.loadMessages();
  },
  methods: {
    async loadMessages() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("messages/loadMessgaesFromServerSide");
      } catch (error) {
        this.error = error.message;
        this.isLoading = false;
        return;
      }
      this.messages = this.$store.getters["messages/getMessages"];
      this.isLoading = false;
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
h4,
h2 {
  text-align: center;
  margin: 10px 0;
  width: 100%;
  position: relative;
}
.psudoCont {
  width: 100%;
}
</style>
