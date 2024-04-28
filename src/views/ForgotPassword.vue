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
              <h2>Forgot Password</h2>
            </v-card-title>
            <v-crad-text>
              <v-form v-model="valid">
                <v-text-field
                  @keydown.enter.prevent="resetPassword"
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

                <div class="d-flex flex-column mt-3">
                  <v-btn
                    @click.prevent="resetPassword"
                    color="blue-accent-3"
                    rounded="xl"
                    class="mb-6"
                    style="height: 45px"
                    :loading="loading"
                  >
                    <strong> Confirm </strong>
                  </v-btn>
                  <v-btn
                    ref="back"
                    variant="plain"
                    rounded="xl"
                    class="mb-6"
                    style="height: 45px"
                    prepend-icon="mdi-keyboard-backspace"
                    :ripple="false"
                    :to="{ name: 'Login' }"
                  >
                    Back
                  </v-btn>
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
          <!-- transition -->
          <v-scroll-x-transition>
            <!-- alert -->
            <v-alert
              :model-value="showAlert"
              :border="true"
              :border-color="'white'"
              text="Done, Now Check your Email Inbox to reset the Password"
              type="success"
              closable
              elevation="10"
              class="mt-16 mx-1"
            ></v-alert>
          </v-scroll-x-transition>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { auth } from "@/firebase";
import { useThemeStore } from "@/stores/useThemeStore";
import { sendPasswordResetEmail } from "firebase/auth";
import { ref } from "vue";

// theme store (state management)
const themeStore = useThemeStore();
const back = ref(null);
//

/*
    Modals
*/
const email = ref("");
const error = ref(null);

/*
    Loaders
*/
const loading = ref(false);

/*
    toggles
*/
const showAlert = ref(false);
/*
    Rules
*/
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

/*
  Methods
*/
const resetPassword = async () => {
  if (!email.value) {
    error.value = "Email Required";
    return;
  }
  loading.value = true;
  try {
    await sendPasswordResetEmail(auth, email.value);
    showAlert.value = true;
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
    email.value = null;
  } catch (err) {
    const errorCode = err.code;
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
</script>
