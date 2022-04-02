<template>
  <base-card>
    <base-dialog :show="!!error" title="Error Occured" @close="handelError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Please Wait" fixed>
      <p>Authenticating ...</p>
      <base-spinner></base-spinner>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email"> E-mail </label>
        <input type="email" id="email" v-model.trim="email" />
      </div>

      <div class="form-control">
        <label for="password"> Password </label>
        <input type="password" id="password" v-model="password" />
      </div>
      <p v-if="!formIsValid">
        Please Enter Avild email and password must be at least 6 digits long
      </p>
      <div class="actions">
        <base-btn>{{ submitButtonText }}</base-btn>
        <base-btn mode="refresh" @click="switchMode" type="button">{{
          switchButtonText
        }}</base-btn>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonText() {
      if (this.mode == "login") {
        return "Login";
      } else {
        return "Sign-up";
      }
    },
    switchButtonText() {
      if (this.mode == "login") {
        return "Sign-up Instead";
      } else {
        return "Login Instead";
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (this.email == "" || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      try {
        if (this.mode == "login") {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        }
        this.$router.replace("/");
      } catch (error) {
        this.isLoading = false;
        this.error = error.message;
        return;
      }
      this.isLoading = false;
    },
    switchMode() {
      if (this.mode == "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handelError() {
      this.error = null;
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
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

form {
  width: 100%;
}

.actions {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>
