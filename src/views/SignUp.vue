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
            <div class="text-h5 font-weight-bold">
              Signed up successfully, you can login to your accout
            </div>
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
              <v-form v-model="valid">
                <v-row class="justify-space-evenly">
                  <v-col>
                    <v-text-field
                      clearable
                      rounded="xl"
                      color="blue-accent-3"
                      label="First Name"
                      type="text"
                      variant="solo"
                      :rules="firstNameRules"
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
                      :rules="lastNameRules"
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
                  @keydown.enter.prevent="signUp"
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
                <div
                  id="buttons"
                  class="d-flex flex-column my-5"
                >
                  <v-btn
                    @click.prevent="signUp"
                    color="blue-accent-3"
                    rounded="xl"
                    class="mb-6"
                    style="height: 45px"
                    :loading="loading"
                  >
                    <strong> Sign up </strong>
                  </v-btn>
                  <v-btn
                    @click.prevent="signUpWithGoogle"
                    rounded="xl"
                    class="mb-6"
                    style="height: 45px"
                    :loading="loadingGoogle"
                  >
                    Sign up With Google
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
import { ref, watch } from "vue";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { db, auth } from "../firebase";
import { useRouter } from "vue-router";
import { doc, setDoc } from "firebase/firestore";
import { useCurrentUser } from "vuefire";
/*
    Variables
*/
const themeStore = useThemeStore();
//
//
let dialog = ref(false); // to show Dialog
let loading = ref(false); // to show Loading in the button
let loadingGoogle = ref(false); // to show Loading in the button
const showPassword = ref(false);
// user
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const valid = ref(false);
const error = ref(null);
const firstNameRules = ref([
  (value) => {
    if (value) return true;

    return "First Name is required";
  },
]);
const lastNameRules = ref([
  (value) => {
    if (value) return true;

    return "Last Name is required";
  },
]);
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
// router
const router = useRouter();
// watch
watch(dialog, () => {
  dialog.value ? "" : router.push({ name: "Login" });
});

/*
    methods
*/
const signUp = async () => {
  if (valid.value) {
    try {
      loading.value = true;
      const res = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      res.user.displayName = `${firstName.value} ${lastName.value}`;
      // save in firestore
      const docRef = doc(db, "users", res.user.uid);
      await setDoc(docRef, {
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        photoUrl: res.user.photoURL,
      });
      //send email verification
      await sendEmailVerification(auth.currentUser);
      loading.value = false;
      dialog.value = true;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }
};
const signUpWithGoogle = async () => {
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
    loadingGoogle.value = true;
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
