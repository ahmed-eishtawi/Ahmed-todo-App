<template>
  <v-row class="py-3 align-center justify-center">
    <v-col cols="12" lg="6">
      <v-card class="w-100">
        <v-form v-model="valid">
          <v-container>
            <v-dialog v-model="dialog" width="auto">
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
            <v-row class="justify-center">
              <v-col cols="12" sm="10">
                <h1 class="text-center bg-blue-accent-3 rounded">Add Todo</h1>
              </v-col>
              <v-col cols="12" sm="10">
                <v-text-field
                  v-model="title"
                  color="blue-accent-3"
                  clearable
                  clear-icon="$clear"
                  :rules="titleRules"
                  label="Title"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="10">
                <v-textarea
                  v-model="details"
                  color="blue-accent-3"
                  clearable
                  clear-icon="$clear"
                  label="Details"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="10">
                <v-row class="justify-center">
                  <v-col cols="12" sm="6" class="text-center">
                    <v-btn
                      @click="addTodo"
                      :disabled="!valid"
                      prepend-icon="mdi-plus-thick"
                      color="green-darken-1"
                      block
                      :loading="loading"
                    >
                      Add
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" class="text-center">
                    <v-btn
                      @click="$router.push({ name: 'TodoList' })"
                      prepend-icon="mdi-arrow-left-circle"
                      color="blue-accent-3"
                      block
                    >
                      Back
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

/*
  Variables
*/
let dialog = ref(false); // to show Dialog when the user add Todo
let loading = ref(false); // to show Loading in the button when the user add Todo
const valid = ref(false);
const title = ref("");
const details = ref("");
const titleRules = ref([
  (value) => {
    if (value) return true;

    return "Title is required";
  },
  (value) => {
    if (value.length > 3) return true;

    return "Title must be at least 3 characters.";
  },
]);

/*
  Methods
*/

const addTodo = async () => {
  loading.value = true;
  const todo = {
    title: title.value,
    details: details.value,
    isCompleted: false,
  };
  const docRef = await addDoc(collection(db, "todos"), todo);
  // show dialog
  loading.value = false;
  dialog.value = true;
  title.value = "";
  details.value = "";
};
</script>
