<template>
  <v-app :theme="themeStore.getTheme">
    <v-container class="d-flex h-screen">
      <v-dialog
        v-model="dialog"
        width="auto"
        persistent
      >
        <v-card
          max-width="450"
          append-icon="$info"
          title="Done"
          rounded="lg"
        >
          <v-divider></v-divider>
          <div class="py-3 text-center px-15">
            <v-icon
              class="mb-3"
              color="success"
              icon="mdi-check-circle-outline"
              size="100"
            ></v-icon>
            <div class="text-h5 font-weight-bold">Added Successfully</div>
          </div>

          <template v-slot:actions>
            <v-btn
              class="ms-auto"
              text="Ok"
              color="success"
              @click="dialog = false"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          lg="5"
          sm="12"
        >
          <v-card class="px-3 px-lg-10 py-10 elevation-10 elevation-10">
            <v-card-title class="headline text-center text-blue-accent-3 mb-5">
              <h2>Sign Up</h2>
            </v-card-title>
            <v-crad-text>
              <v-form>
                <v-row class="justify-space-evenly">
                  <v-col>
                    <v-text-field
                      clearable
                      rounded="xl"
                      color="blue-accent-3"
                      label="First Name"
                      type="text"
                      variant="solo"
                      v-model="firstName"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      clearable
                      rounded="xl"
                      color="blue-accent-3"
                      label="Last Name"
                      type="text"
                      variant="solo"
                      v-model="lastName"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  clearable
                  rounded="xl"
                  color="blue-accent-3"
                  label="Email"
                  type="email"
                  variant="solo"
                  v-model="email"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="blue-accent-3"> mdi-email-outline </v-icon>
                  </template>
                </v-text-field>
                <v-text-field
                  clearable
                  rounded="xl"
                  color="blue-accent-3"
                  label="password"
                  type="password"
                  variant="solo"
                  v-model="password"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="blue-accent-3"> mdi-lock-outline </v-icon>
                  </template>
                </v-text-field>
                <!-- maybe i will remove it -->
                <div class="mt-n2 d-flex justify-end pr-2">
                  <h5 class="text-blue-accent-3 cursor-pointer">
                    Forget Password
                  </h5>
                </div>
                <div
                  id="buttons"
                  class="d-flex flex-column my-5"
                >
                  <v-btn
                    @click.prevent="signUp"
                    prepend-icon="mdi-login-variant"
                    color="blue-accent-3"
                    rounded="xl"
                    class="mb-6"
                    style="height: 45px"
                  >
                    Sign up
                  </v-btn>
                  <v-btn
                    @click.prevent="signUpWithGoogle"
                    rounded="xl"
                    class="mb-6"
                    style="height: 45px"
                    :loading = loading
                  >
                    Sign up With Google
                    <template v-slot:prepend>
                      <v-icon
                        color="primary"
                        size="30"
                      >
                        mdi-google
                      </v-icon>
                    </template>
                  </v-btn>
                  <div>
                    <h4 class="mt-3 text-center">
                      Already Have Account
                      <router-link
                        :to="{ name: 'Login' }"
                        class="text-blue-accent-3"
                        ><strong>Login</strong></router-link
                      >
                    </h4>
                  </div>
                </div>
              </v-form>
            </v-crad-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { useThemeStore } from "@/stores/useThemeStore";
import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
/*
    Variables
*/
const themeStore = useThemeStore();
//
let dialog = ref(false); // to show Dialog when the user add Todo
let loading = ref(false); // to show Loading in the button when the user add Todo
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const auth = getAuth();

/*
    methods
*/
const signUp = async () => {
  try {
    loading.value = true;
    const user = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    auth.currentUser.displayName =
      firstName.value.trim() + " " + lastName.value.trim();
    //
    await sendEmailVerification(auth.currentUser);
    console.log(user);
    loading.value = false;
    dialog.value = true;

  } catch (err) {
    console.log(err);
  }
};
const signUpWithGoogle = () => {
  console.log("test");
};
</script>

<style></style>
