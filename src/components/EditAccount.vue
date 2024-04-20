<template>
  <div class="pa-4 text-center">
    <v-dialog
      transition="fab-transition"
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <template v-slot:title>
          <div class="text-blue-accent-3">User Profile</div>
        </template>
        <!--  -->
        <template v-slot:prepend>
          <v-icon color="blue accent-3"> mdi-account-edit </v-icon>
        </template>
        <!--  -->
        <v-form v-model="valid">
          <v-dialog
            v-model="savedDialog"
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
                <div class="text-h5 font-weight-bold">Changes Saved</div>
              </div>

              <template v-slot:actions>
                <v-btn
                  class="ms-auto"
                  text="Ok"
                  color="success"
                  @click="
                    savedDialog = false;
                    $emit('cancel');
                  "
                >
                </v-btn>
              </template>
            </v-card>
          </v-dialog>
          <!--  -->
          <v-card-text class="mt-5">
            <v-row dense>
              <v-col
                cols="12"
                class="text-center text-sm-start"
              >
                <div
                  v-if="changeProfilePhoto"
                  class="d-lg-flex align-center"
                >
                  <v-file-input
                    v-model="profilePhoto"
                    :loading="loadingUploadProfilePhoto"
                    label="Upload Profile photo"
                    multiple
                    small-chips
                    show-size
                    accept="image/*"
                  ></v-file-input>
                  <v-btn
                    @click="uploadProfilePhoto"
                    variant="text"
                    :ripple="true"
                    :loading="loadingUploadProfilePhoto"
                    class="text-green-lighten-1 ml-sm-1"
                  >
                    upload
                  </v-btn>
                  <v-btn
                    @click="removeProfilePhoto"
                    variant="text"
                    :ripple="true"
                    :loading="loadingRemoveProfilePhoto"
                    class="text-red-lighten-1 ml-sm-1"
                  >
                    remove
                  </v-btn>
                  <v-btn
                    @click="changeProfilePhoto = false"
                    variant="plain"
                    :ripple="false"
                    class="text-red-lighten-1"
                  >
                    cancel
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn
                    @click="changeProfilePhoto = true"
                    variant="text"
                    prepend-icon="mdi-image-edit"
                    class="w-33"
                  >
                    Change Photo
                  </v-btn>
                </div>
              </v-col>

              <v-divider class="mb-3"></v-divider>

              <v-col
                cols="12"
                class="text-center text-sm-start"
              >
                <div v-if="changeName">
                  <v-col
                    cols="12"
                    class="pb-0"
                  >
                    <v-text-field
                      v-model="firstName"
                      label="First Name"
                      :rules="firstNameRules"
                      hint="Enter your First Name"
                      required
                      clearable
                      autofocus
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    class="py-0"
                  >
                    <v-text-field
                      v-model="lastName"
                      label="Last name"
                      :rules="lastNameRules"
                      hint="Enter your Last Name"
                      required
                      clearable
                    ></v-text-field>
                  </v-col>
                  <v-btn
                    @click="changeName = false"
                    variant="plain"
                    :ripple="false"
                    class="text-red-lighten-1"
                  >
                    cancel
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn
                    @click="changeName = true"
                    variant="text"
                    prepend-icon="mdi-pencil"
                    class="w-33"
                  >
                    Change Name
                  </v-btn>
                </div>
              </v-col>

              <v-divider class="mb-3"></v-divider>

              <v-col
                cols="12"
                class="text-center text-sm-start"
              >
                <div
                  v-if="changePassword"
                  class="d-lg-flex align-center"
                >
                  <v-text-field
                    v-model="password"
                    label="Password"
                    :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    clearable
                    autofocus
                  >
                    <template v-slot:prepend-inner>
                      <v-icon> mdi-lock-outline </v-icon>
                    </template>
                    <template v-slot:append-inner>
                      <div
                        @click="showPassword = !showPassword"
                        class="cursor-pointer"
                      >
                        <v-icon v-if="!showPassword">
                          mdi-eye-off-outline
                        </v-icon>
                        <v-icon v-else> mdi-eye-outline </v-icon>
                      </div>
                    </template>
                  </v-text-field>
                  <v-btn
                    @click="changePassword = false"
                    variant="plain"
                    :ripple="false"
                    class="text-red-lighten-1"
                  >
                    cancel
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn
                    @click="changePassword = true"
                    variant="text"
                    prepend-icon="mdi-lock"
                    class="w-33 pr-10"
                  >
                    Password
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text="Cancel"
              variant="plain"
              color="red-lighten-1"
              class="px-3 my-1"
              @click="$emit('cancel')"
            ></v-btn>

            <v-btn
              color="green-lighten-1"
              text="Save"
              variant="plain"
              class="text-center mr-3 px-5 my-1"
              append-icon="mdi-content-save"
              @click="$emit('save', valid)"
            ></v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { db, storage } from "../firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getUser } from "../composables/getUser";
import {
  deleteObject,
  ref as fireRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
//

/*
  loaders
*/
let loadingUploadProfilePhoto = ref(false);
let loadingRemoveProfilePhoto = ref(false);
//
// v-models
const profilePhoto = ref(null);
const firstName = ref("");
const lastName = ref("");
const password = ref("");
//
const PhotoUrl = ref(null); // to check if user have photo or not in firestore
//
// toggles
const dialog = ref(true);
let savedDialog = ref(false);
const changeProfilePhoto = ref(false);
const changeName = ref(false);
const changePassword = ref(false);
const showPassword = ref(false);
//
// user
const { user } = { ...getUser() };

//
// rules
const valid = ref(false);
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
    if (value || !value) return true;
  },
  (value) => {
    if (value) {
      if (value.length > 7) return true;
      return "Password must be at least 8 characters";
    }
  },
]);
//
/*
  methods
*/
const uploadProfilePhoto = async () => {
  if (profilePhoto.value) {
    loadingUploadProfilePhoto.value = true;
    try {
      const storageRef = fireRef(
        storage,
        "users-images/".concat(user.value.uid)
      );
      await uploadBytes(storageRef, profilePhoto.value[0]);
      // saved in storage
      //
      // now get photo url from storage
      const photoUrl = await getDownloadURL(storageRef);
      //
      // now save the photo url to my firestore
      const docRef = doc(db, "users", user.value.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          photoUrl: photoUrl,
        });
      }

      savedDialog.value = true;
    } catch (err) {
      console.log(err);
    } finally {
      loadingUploadProfilePhoto = false;
      profilePhoto.value = null;
    }
  }
};
const removeProfilePhoto = async () => {
  if (PhotoUrl.value) {
    loadingRemoveProfilePhoto.value = true;
    try {
      const storageRef = fireRef(
        storage,
        "users-images/".concat(user.value.uid)
      );
      await deleteObject(storageRef);
      // deleted from storage
      const docRef = doc(db, "users", user.value.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          photoUrl: "",
        });
      }
      savedDialog.value = true;
      PhotoUrl.value = null;
    } catch (err) {
      console.log(err);
    } finally {
      loadingRemoveProfilePhoto.value = false;
    }
  }
};
//
// lifeCycleHooks
onMounted(async () => {
  try {
    const docRef = doc(db, "users", user.value.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      firstName.value = docSnap.data().firstName;
      lastName.value = docSnap.data().lastName;
      PhotoUrl.value = docSnap.data().photoUrl;
      console.log("done");
    }
  } catch (err) {
    console.log(err);
  }
});
</script>
