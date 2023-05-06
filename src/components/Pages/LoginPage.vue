<template>
  <div>
    <form
      class="flex flex-col items-center"
      @submit.prevent>
      <notification
        :message="errorMessage"
        :hide-after="5000"
        class="mb-3" />
      <input-field
        title="Login"
        type="text"
        :value="login"
        @input="login = $event" />

      <input-field
        title="Password"
        type="password"
        :value="password"
        @input="password = $event" />

      <div>
        <Button
          type="save"
          button-text="Log in"
          class="w-56"
          @click="onLogin" />
      </div>

      <div class="flex items-center mt-3">
        <p class="mr-3">
          Dont have an account?
        </p>
        <router-link
          :to="'/register?from=' + routerFromQuery"
          class="text-sm underline">
          Create a new one
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import InputField from '../Atoms/Fields/InputField.vue';
import Notification from '../Atoms/Notification.vue';
import Button from '../Atoms/Button.vue';
//import { mapActions } from 'vuex';

export default {
    components: {
        InputField,
        Notification,
        Button
    },
    data() {
        return {
            login: '',
            password: '',
            errorMessage: ''
        };
    },
    computed: {
        routerFromQuery() {
            return this.$route?.query.from || '';
        },
    },
    methods: {
        //...mapActions(['logIn']),
        onLogin() {
            this.errorMessage = '';

            return this.logIn(this.getLoginData())
                .then(() => {
                    this.$router.push('/' + this.routerFromQuery);
                })
                .catch(() => {
                    this.errorMessage = 'Password or email is incorrect';
                });
        },
        logIn() {},
        getLoginData() {
            return {
                email: this.login,
                password: this.password
            };
        }
    },
}
</script>