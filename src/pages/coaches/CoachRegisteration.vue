<template>
  <div class="psudoCont">
    <base-dialog :show="!!error" @close="handelError" title="Error Occured">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>Register As Coach</h2>
        <coach-registeration-form
          @send-data="saveData"
        ></coach-registeration-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachRegisterationForm from "../../components/coaches/CoachRegisterationForm.vue";
import BaseDialog from "../../components/UI/BaseDialog.vue";
export default {
  components: {
    CoachRegisterationForm,
    BaseDialog,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async saveData(formData) {
      this.isLoading = true;
      const isCoach = this.$store.getters["coaches/isCoach"];
      if (isCoach) {
        this.isLoading = false;
        this.error = "You Already A Coach";
        return;
      }
      try {
        await this.$store.dispatch("coaches/registerCoach", formData);
      } catch (error) {
        this.isLoading = false;
        this.error = error.message;
        return;
      }
      this.$router.replace("/");
      this.isLoading = false;
    },
    handelError() {
      this.error = null;
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
section {
  width: 80%;
}
</style>
