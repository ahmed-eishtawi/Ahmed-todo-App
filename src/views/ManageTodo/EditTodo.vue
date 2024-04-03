<template>
  <v-row class="py-3 align-center justify-center">
    <v-col
      cols="12"
      lg="6"
    >
      <v-card class="w-100">
        <v-form v-model="valid">
          <v-container>
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
                    color="amber-darken-1"
                    icon="mdi-check-circle-outline"
                    size="100"
                  ></v-icon>
                  <div class="text-h5 font-weight-bold">
                    Edited Successfully
                  </div>
                </div>

                <template v-slot:actions>
                  <v-btn
                    class="ms-auto"
                    text="Ok"
                    color="amber-darken-1"
                    @click="dialog = false"
                  ></v-btn>
                </template>
              </v-card>
            </v-dialog>
            <v-row class="justify-center">
              <v-col
                cols="12"
                sm="10"
              >
                <h1 class="text-center bg-blue-accent-3 rounded">Edit Todo</h1>
              </v-col>
              <v-col
                cols="12"
                sm="10"
              >
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

              <v-col
                cols="12"
                sm="10"
              >
                <v-textarea
                  v-model="details"
                  color="blue-accent-3"
                  clearable
                  clear-icon="$clear"
                  label="Details"
                ></v-textarea>
              </v-col>
              <v-col
                cols="12"
                sm="10"
              >
                <v-row class="justify-center">
                  <v-col
                    cols="12"
                    sm="6"
                    class="text-center"
                  >
                    <v-btn
                      @click="editTodo"
                      :disabled="!valid"
                      prepend-icon="mdi-pencil"
                      color="amber-darken-1"
                      block
                      :loading="loading"
                    >
                      Edit
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    class="text-center"
                  >
                    <v-btn
                      @click="$router.push({ name: 'Todo List' })"
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
import { defineProps, onMounted, ref, watch } from "vue";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "vue-router";

/*
  Props
*/
const props = defineProps(["id"]);
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
    if (value.length > 2) return true;

    return "Title must be at least 3 characters.";
  },
]);

const router = useRouter();

// watch
watch(dialog, () => {
  dialog.value ? "" : router.push({ name: "Todo List" });
});
/*
  lifeCycleHooks
*/
onMounted(async () => {
  const docRef = doc(db, "todos", props.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    title.value = docSnap.data().title;
    details.value = docSnap.data().details;
  }
});
/*
  methods
*/
const editTodo = async (todo) => {
  if (!title.length) {
    //فيه خطأ معنديش ليه وقت حاليا
    if (title.value.length > 2) {
      loading.value = true;
      await updateDoc(doc(db, "todos", props.id), {
        title: title.value,
        details: details.value,
      });
      loading.value = false;
      dialog.value = true;
    }
  }
};
</script>

<style></style>
