<template>
  <div v-if="!submitted">
    <h2>Contact form</h2>
    <ul class="errors" v-if="errors.length">
      <li v-for="error in errors">{{error}}</li>
    </ul>
    <form>
      <div class="field">
        <div class="control">
          <input v-model="form.full_name" type="text" placeholder="name">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="form.email" type="email" placeholder="email">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <textarea v-model="form.body" class="textarea" rows="7" placeholder="What do you need?"></textarea>
        </div>
      </div>
      <div class="field">
        <button @click.prevent="submitForm" class="button">Send</button>
      </div>
    </form>
  </div>
  <div v-else>Your form has been submitted! thanks</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "http://localhost:8888/wp-json/send-contact-form/v1/contact",
      form: {
        full_name: "",
        email: "",
        body: ""
      },
      errors: [],
      submitted: false
    };
  },
  methods: {
    submitForm() {
      axios
        .post(this.url, this.form)
        .then(response => {
          console.log(response);
          this.errors = [];
          if (this.errors == 0) {
            this.submitted = true;
          }
        })
        .catch(error => {
          this.errors = error.response.data.message;
        });
    }
  },
  mounted() {}
};
</script>

<style>
</style>
