<template>
  <v-app :theme="themeStore.getTheme">
    <v-container class="d-flex h-screen">
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
              <h2>Login</h2>
            </v-card-title>
            <v-crad-text>
              <v-form v-model="valid">
                <v-text-field
                  clearable
                  rounded="xl"
                  color="blue-accent-3"
                  label="Email"
                  type="email"
                  variant="solo"
                  :rules="emailRules"
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
                  :type="showPassword ? 'text' : 'password'"
                  variant="solo"
                  :rules="passwordRules"
                  v-model="password"
                  @keydown.enter.prevent="login"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="blue-accent-3"> mdi-lock-outline </v-icon>
                  </template>
                  <template v-slot:append-inner>
                    <div
                      @click="showPassword = !showPassword"
                      class="cursor-pointer"
                    >
                      <v-icon
                        v-if="!showPassword"
                        color="blue-accent-3"
                      >
                        mdi-eye-off-outline
                      </v-icon>
                      <v-icon
                        v-else
                        color="blue-accent-3"
                      >
                        mdi-eye-outline
                      </v-icon>
                    </div>
                  </template>
                </v-text-field>
                <!-- maybe i will remove it -->
                <div class="mt-n2 d-flex justify-end pr-2">
                  <h5 class="text-blue-accent-3 cursor-pointer">
                    Forgot Password ?
                  </h5>
                </div>
                <div
                  id="buttons"
                  class="d-flex flex-column my-5"
                >
                  <v-btn
                    @click.prevent="login"
                    color="blue-accent-3"
                    rounded="xl"
                    class="mb-6"
                    style="height: 45px"
                    :loading="loading"
                  >
                    <strong> Login </strong>
                  </v-btn>
                  <v-btn
                    @click.prevent="loginWithGoogle"
                    rounded="xl"
                    class="mb-6"
                    style="height: 45px"
                    :loading="loadingGoogle"
                  >
                    Login With Google
                    <template v-slot:prepend>
                      <v-icon
                        color="blue-accent-3"
                        size="25"
                      >
                        mdi-google
                      </v-icon>
                    </template>
                  </v-btn>
                  <div>
                    <h4 class="mt-3 text-center">
                      Don't Have Account
                      <router-link
                        :to="{ name: 'Sign Up' }"
                        class="text-blue-accent-3"
                        ><strong>Sign up</strong></router-link
                      >
                    </h4>
                  </div>
                </div>
              </v-form>
            </v-crad-text>
            <div
              v-if="error"
              class="text-center text-red-accent-4"
            >
              <h3>{{ error }}</h3>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { useThemeStore } from "@/stores/useThemeStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
/*
    Variables
*/
const themeStore = useThemeStore();
const router = useRouter();
//
const showPassword = ref(false);
let loading = ref(false); // to show Loading in the button
let loadingGoogle = ref(false); // to show Loading in the button
// user
const email = ref("");
const password = ref("");
const error = ref(null);
const valid = ref(false);
//
const emailRules = ref([
  (value) => {
    if (value) return true;

    return "Email is required";
  },
  (value) => {
    if (value.includes("@")) return true;
    return `Email Must have "@"`;
  },
]);
const passwordRules = ref([
  (value) => {
    if (value) return true;

    return "Password is required";
  },
  (value) => {
    if (value.length > 7) return true;
    return "Password must be at least 8 characters";
  },
]);

/*
    methods
*/
const login = async () => {
  try {
    loading.value = true;
    const res = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    loading.value = false;
    router.push({ name: "Todo List" });
  } catch (err) {
    error.value = err.message;
    console.log(err);
  } finally {
    loading.value = false;
  }
};
const loginWithGoogle = async () => {
  try {
    loadingGoogle.value = true;
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(res);
    const fullName = res.user.displayName.split(" ");
    // save in firestore
    const docRef = doc(db, "users", res.user.uid);
    await setDoc(docRef, {
      email: res.user.email,
      firstName: fullName[0],
      lastName: fullName[1],
      photoUrl: res.user.photoURL,
    });
    loadingGoogle.value = false;
    router.push({ name: "Todo List" });
  } catch (err) {
    error.value = GoogleAuthProvider.credentialFromError(err);
    console.log(err);
  } finally {
    loadingGoogle.value = false;
  }
};
</script>

<style></style>
