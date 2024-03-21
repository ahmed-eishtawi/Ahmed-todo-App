<template>
  <v-row class="py-3 align-center justify-center">
    <v-col cols="12" lg="6">
      <v-card class="w-100">
        <v-form v-model="valid">
          <v-container>
            <v-row class="justify-center">
              <v-col cols="12" sm="10">
                <h1 class="text-center bg-blue-accent-3 rounded">Edit Todo</h1>
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
                      @click="editTodo"
                      :disabled="!valid"
                      prepend-icon="mdi-pencil"
                      color="amber-darken-1"
                      block
                    >
                      Edit
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
import { defineProps, ref } from "vue";
/*
  Props
*/
defineProps(["id"]);

/*
  Variables
*/
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
</script>

<style></style>
