<template>
  <div class="psudoCont">
    <base-dialog title=" Error Occured!" :show="!!error" @close="handelError">
      <p>{{ error }}</p>
    </base-dialog>
    <div class="subCont">
      <the-list-item
        :firstName="selectedCoach.firstName"
        :lastName="selectedCoach.lastName"
        :image="selectedCoach.Image"
        :areas="selectedCoach.areas"
        :description="selectedCoach.description"
        :hourRate="selectedCoach.hourlyRate"
        :button="false"
      >
      </the-list-item>
      <base-card v-if="isLoading">
        <base-spinner></base-spinner>
      </base-card>
      <base-card class="fitCard" v-if="!isLoading">
        <h2>Contact Him Now</h2>
        <form @submit.prevent="submitForm">
          <div
            class="from-control"
            :class="{ invalid: email === '' && !formIsValid }"
          >
            <label for="email">Your E-Mail</label>
            <input
              type="email"
              id="email"
              v-model.trim="email"
              @change="checkValidaty"
            />
            <p v-if="email === '' && !formIsValid">
              You Have To Enter Valid Email
            </p>
          </div>
          <div
            class="from-control"
            :class="{ invalid: message === '' && !formIsValid }"
          >
            <label for="message">Your Message</label>
            <textarea rows="5" id="message" v-model.trim="message" />
            <p v-if="message === '' && !formIsValid">
              You Have To Enter Message
            </p>
          </div>
          <div class="actions">
            <base-btn
              ><font-awesome-icon icon="envelope" class="icon" />Send
              Message</base-btn
            >
          </div>
        </form>
      </base-card>
    </div>
  </div>
</template>
<script>
import TheListItem from "../../components/coaches/TheListItem.vue";
import BaseSpinner from "../../components/UI/BaseSpinner.vue";
import BaseDialog from "../../components/UI/BaseDialog.vue";
export default {
  props: ["id"],
  components: {
    TheListItem,
    BaseSpinner,
    BaseDialog,
  },
  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,
      selectedCoach: null,
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.selectedCoach = this.$store.getters["coaches/getCoaches"].find(
      (coach) => coach.id === this.id
    );
  },
  methods: {
    async submitForm() {
      if (this.email === "" || this.message === "") {
        this.formIsValid = false;
        return;
      }
      const message = {
        cID: this.$route.params.id,
        Email: this.email,
        Content: this.message,
      };
      this.isLoading = true;
      try {
        await this.$store.dispatch("messages/AddNewMessage", message);
      } catch (error) {
        this.isLoading = false;
        this.error = error.message;
        return;
      }
      this.isLoading = false;
      this.$router.replace("/");
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
.Item {
  width: 50% !important;
}
.fitCard {
  width: 50% !important;
  max-width: none !important;
}
.subCont {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10px;
}
h2 {
  text-align: center;
}
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  resize: none;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
.psudoCont {
  width: 100%;
}
</style>
