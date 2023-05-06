<template>
  <div class="flex">
    <form
      class="flex flex-col items-center p-5 w-1/2"
      @submit.prevent>
      <Notification
        :message="errorMessage"
        :hide-after="5000"
        class="mb-3" />

      <div class="mb-5">
        <InputField
          title="Login"
          type="text"
          class="bg-white"
          :value="loginStr"
          @input="loginStr = $event" />
      </div>

      <div class="mb-5">
        <InputField
          title="Password"
          type="password"
          :value="password"
          @input="password = $event" />
      </div>

      <div>
        <Button
          type="save"
          button-text="Log in"
          class="w-56"
          @click="onLogin" />
      </div>
    </form>

    <div
      v-if="logout"
      class="w-1/2">
      You are successfully logged out
    </div>
  </div>
</template>

<script>
import InputField from '../Atoms/Fields/InputField.vue';
import Notification from '../Atoms/Notification.vue';
import Button from '../Atoms/Button.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        InputField,
        Notification,
        Button
    },
    props: {
        logout: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            loginStr: '',
            password: '',
            errorMessage: ''
        };
    },
    computed: {
        ...mapGetters(['isUserLogged']),
        routerFromQuery() {
            return this.$route?.query.from || 'main';
        },
    },
    mounted() {
        if (this.logout) {
            this.userLogout();
        }
    },
    beforeMount() {
        if(this.isUserLogged) {
            this.$router.push('/main');
        }
    },
    methods: {
        ...mapActions({login: 'login', userLogout: 'logout'}),
        onLogin() {
            this.errorMessage = '';

            return this.login(this.getLoginData())
                .then(() => {
                    this.$router.push('/' + this.routerFromQuery);
                })
                .catch(() => {
                    this.errorMessage = 'Password or email is incorrect';
                });
        },
        getLoginData() {
            return {
                email: this.loginStr,
                password: this.password
            };
        }
    },
}
</script>