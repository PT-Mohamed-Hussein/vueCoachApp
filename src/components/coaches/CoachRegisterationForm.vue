<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.valid }">
      <label for="firstname">FirstName</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.valid">First Name Must Not Be Empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.valid }">
      <label for="lastname">LastName</label>
      <input
        v-model.trim="lastName.val"
        type="text"
        id="lastname"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.valid">First Name Must Not Be Empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !imageURL.valid }">
      <label for="image">Direct Image URL</label>
      <input
        v-model="imageURL.val"
        type="url"
        id="image"
        @blur="clearValidity('imageURL')"
      />
      <p v-if="!imageURL.valid">Image Url Must Not Be Empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.valid }">
      <label for="description">Description:</label>
      <textarea
        v-model.trim="description.val"
        type="text"
        id="description"
        rows="5"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.valid">Description Must Not Be Empty.</p>
    </div>

    <div class="form-control" :class="{ invalid: !rate.valid }">
      <label for="rate">HourlyRate</label>
      <input
        v-model.number="rate.val"
        type="number"
        id="rate"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.valid">
        Rate Must Be Greater Than 0$ and samller than 100$ per hour.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.valid }">
      <h3>Areas Of Experties</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">FrontEnd Developer</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">BackEnd Developer</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.valid">At Least One Experties Must Be Selected.</p>
    </div>
    <p v-if="!isValid">Please Fix The Above Errors And Submit Again.</p>
    <div class="registerbtn">
      <base-btn>Register</base-btn>
    </div>
  </form>
</template>

<script>
export default {
  emits: ["send-data"],
  data() {
    return {
      firstName: { val: "", valid: true },
      lastName: { val: "", valid: true },
      imageURL: { val: "", valid: true },
      description: { val: "", valid: true },
      rate: { val: null, valid: true },
      areas: { val: [], valid: true },
      isValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].valid = true;
    },
    validateForm() {
      this.isValid = true;
      if (this.firstName.val === "") {
        this.firstName.valid = false;
        this.isValid = false;
      }
      if (this.lastName.val === "") {
        this.lastName.valid = false;
        this.isValid = false;
      }
      if (this.imageURL.val === "") {
        this.imageURL.valid = false;
        this.isValid = false;
      }
      if (this.description.val === "") {
        this.description.valid = false;
        this.isValid = false;
      }
      if (!this.rate.val || this.rate.val < 0 || this.rate.val > 100) {
        this.rate.valid = false;
        this.isValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.valid = false;
        this.isValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.isValid) {
        return;
      }

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        img: this.imageURL.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      this.$emit("send-data", formData);
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
.registerbtn {
  display: flex;
  justify-content: flex-end;
}
</style>
