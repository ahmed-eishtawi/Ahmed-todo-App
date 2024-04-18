<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        title="User Profile"
      >
        <v-card-text class="mt-5">
          <v-row dense>
            <v-col cols="12">
              <v-file-input
                v-model="image"
                label="Upload Profile Image"
                multiple
                small-chips
                accept="image/*"
              ></v-file-input>
            </v-col>

            <v-divider class="mb-3"></v-divider>

            <v-col
              cols="12"
              md="6"
              sm="6"
            >
              <v-text-field
                v-model="firstName"
                label="First Name"
                required
                hint="Enter your First Name"
                clearable
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
              sm="6"
            >
              <v-text-field
                v-model="lastName"
                hint="Enter your Last Name"
                label="Last name"
                required
                clearable
              ></v-text-field>
            </v-col>

            <v-divider class="mb-3"></v-divider>

            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <v-text-field
                v-model="password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                required
                clearable
              >
                <template v-slot:prepend-inner>
                  <v-icon> mdi-lock-outline </v-icon>
                </template>
                <template v-slot:append-inner>
                  <div
                    @click="showPassword = !showPassword"
                    class="cursor-pointer"
                  >
                    <v-icon v-if="!showPassword"> mdi-eye-off-outline </v-icon>
                    <v-icon v-else> mdi-eye-outline </v-icon>
                  </div>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Cancel"
            variant="plain"
            class="px-3 my-1"
            @click="$emit('cancel')"
          ></v-btn>

          <v-btn
            color="green-darken-1 text-center"
            text="Save"
            variant="tonal"
            class="mr-3 px-5 my-1"
            append-icon="mdi-content-save"
            @click="$emit('save', valid)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { getUser } from "../composables/getUser";
//
// variables
const image = ref(null);
const firstName = ref("");
const lastName = ref("");
const password = ref("");
//
const dialog = true;
const valid = ref(false);
const showPassword = ref(false);
//
// user
const { user } = { ...getUser() };
console.log("editUser: " + user.value)

//
// rules
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
//
// lifeCycleHooks
onMounted(async () => {
  try {
    const docRef = doc(db, "users", user.value.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      firstName.value = docSnap.data().firstName;
      lastName.value = docSnap.data().lastName;
      console.log("done");
    }
  } catch (err) {
    console.log(err);
  }
});
</script>

<style></style>
