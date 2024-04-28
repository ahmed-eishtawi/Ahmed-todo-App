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
                  tabindex="1"
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
                  tabindex="2"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="blue-accent-3"> mdi-lock-outline </v-icon>
                  </template>
                  <template v-slot:append-inner>
                    <div
                      @click="showPassword = !showPassword"
                      class="cursor-pointer"
                      tabindex="3"
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
                  <h5
                    class="text-blue-accent-3 cursor-pointer"
                    @click.prevent="forgotPassword"
                    tabindex="4"
                  >
                    Forgot Password ?
                  </h5>
                </div>
                <div class="d-flex flex-column my-5">
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
                      <img
                        src="data:image/svg+xml,%3csvg%20width='28'%20height='28'%20viewBox='0%200%2028%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M27.9851%2014.2618C27.9851%2013.1146%2027.8899%2012.2775%2027.6837%2011.4094H14.2788V16.5871H22.1472C21.9886%2017.8738%2021.132%2019.8116%2019.2283%2021.1137L19.2016%2021.287L23.44%2024.4956L23.7336%2024.5242C26.4304%2022.0904%2027.9851%2018.5093%2027.9851%2014.2618Z'%20fill='%234285F4'/%3e%3cpath%20d='M14.279%2027.904C18.1338%2027.904%2021.37%2026.6637%2023.7338%2024.5245L19.2285%2021.114C18.0228%2021.9356%2016.4047%2022.5092%2014.279%2022.5092C10.5034%2022.5092%207.29894%2020.0754%206.15663%2016.7114L5.9892%2016.7253L1.58205%2020.0583L1.52441%2020.2149C3.87224%2024.7725%208.69486%2027.904%2014.279%2027.904Z'%20fill='%2334A853'/%3e%3cpath%20d='M6.15656%2016.7113C5.85516%2015.8432%205.68072%2014.913%205.68072%2013.9519C5.68072%2012.9907%205.85516%2012.0606%206.14071%2011.1925L6.13272%2011.0076L1.67035%207.62109L1.52435%207.68896C0.556704%209.58024%200.00146484%2011.7041%200.00146484%2013.9519C0.00146484%2016.1997%200.556704%2018.3234%201.52435%2020.2147L6.15656%2016.7113Z'%20fill='%23FBBC05'/%3e%3cpath%20d='M14.279%205.3947C16.9599%205.3947%2018.7683%206.52635%2019.7995%207.47204L23.8289%203.6275C21.3542%201.37969%2018.1338%200%2014.279%200C8.69485%200%203.87223%203.1314%201.52441%207.68899L6.14077%2011.1925C7.29893%207.82856%2010.5034%205.3947%2014.279%205.3947Z'%20fill='%23EB4335'/%3e%3c/svg%3e"
                        alt=""
                        height="23"
                      />
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
            <!-- error Message -->
            <v-snackbar
              v-model="error"
              multi-line
              :timeout="3000"
              rounded
              color="red-accent-3"
            >
              {{ error || "" }}

              <template v-slot:actions>
                <v-btn
                  color="white"
                  variant="plain"
                  @click="error = null"
                  rounded
                  :icon="'mdi-close'"
                >
                </v-btn>
              </template>
            </v-snackbar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { useThemeStore } from "@/stores/useThemeStore";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
  lifeCycleHooks
*/
onBeforeMount(async () => {
  const res = await getRedirectResult(auth);
  if (res) {
    const userdoc = doc(db, "users", res.user.uid);
    const docSnap = await getDoc(userdoc);
    if (!docSnap.exists()) {
      const fullName = res.user.displayName.split(" ");
      // save in firestore
      const docRef = doc(db, "users", res.user.uid);
      await setDoc(docRef, {
        email: res.user.email,
        firstName: fullName[0],
        lastName: fullName[1],
        photoUrl: res.user.photoURL,
      });
      console.log("done");
    }
    loadingGoogle.value = false;
    router.push({ name: "Todo List" });
  }
});
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
    if (!res.user.emailVerified) {
      throw new Error(
        "Email not Verified yet, Please Check your Email Inbox and Verify your Account"
      );
    }
    loading.value = false;
    router.push({ name: "Todo List" });
  } catch (err) {
    if (
      err.message ===
      "Email not Verified yet, Please Check your Email Inbox and Verify your Account"
    ) {
      error.value = err.message;
      return;
    }
    const errorCode = err.code;
    console.log(err.message);
    switch (errorCode) {
      case "auth/user-not-found":
        error.value = "User not found. Please check your email.";
        break;
      case "auth/invalid-credential":
        error.value = "Email or Password not correct";
        break;
      case "auth/invalid-email":
        error.value = "Please enter a valid email address.";
        break;
      case "auth/email-already-in-use":
        error.value = "This email address is already in use.";
        break;
      case "auth/operation-not-allowed":
        error.value = "An error occurred. Please try again.";
        break;
      // Add more cases for other relevant error codes
      default:
        error.value = "An unknown error occurred. Please try again.";
    }
  } finally {
    loading.value = false;
  }
};
//
const loginWithGoogle = async () => {
  try {
    loadingGoogle.value = true;
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(res);
  } catch (err) {
    error.value = GoogleAuthProvider.credentialFromError(err);
    console.log(err);
  } finally {
    loadingGoogle.value = false;
  }
};
</script>
