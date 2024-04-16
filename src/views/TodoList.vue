<template>
  <v-row class="py-3">
    <v-col
      cols="12"
      sm="12"
      lg="7"
      class="mx-auto"
    >
      <v-card
        class="mb-xs-5 mb-lg-0"
        color="grey-lighten-3"
        width="100%"
      >
        <v-layout>
          <v-dialog
            v-model="dialog"
            width="auto"
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
                  icon="mdi-delete"
                  size="100"
                ></v-icon>
                <div class="text-h5 font-weight-bold">Deleted Successfully</div>
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
          <!-- Todo Bar -->
          <v-app-bar color="blue-accent-3">
            <v-app-bar-title>Todo</v-app-bar-title>
            <v-btn
              to="/add-todo"
              color="white"
              icon="mdi-plus"
            >
            </v-btn>
            <v-btn icon>
              <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props">mdi-dots-vertical</v-icon>
                </template>
                <v-list class="pa-0">
                  <v-list-item append-icon="mdi-delete">
                    <v-list-item-title
                      @click="clearTodo"
                      class="cursor-pointer"
                      >Clear All Todo</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </v-app-bar>

          <!-- List -->
          <v-main>
            <v-row
              v-if="loading"
              dense
              color=""
            >
              <v-col cols="12">
                <v-skeleton-loader
                  class="rounded-0 ma-0 pa-0"
                  type="list-item, subtitle"
                ></v-skeleton-loader>
                <v-skeleton-loader
                  class="rounded-0 ma-0 pa-0"
                  type="list-item, subtitle"
                ></v-skeleton-loader>
                <v-skeleton-loader
                  class="rounded-0 ma-0 pa-0"
                  type="list-item, subtitle"
                ></v-skeleton-loader>
                <v-skeleton-loader
                  class="rounded-0 ma-0 pa-0"
                  type="list-item, subtitle"
                ></v-skeleton-loader>
                <v-skeleton-loader
                  class="rounded-0 ma-0 pa-0"
                  type="list-item, subtitle"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
            <v-row
              v-else
              dense
              color=""
            >
              <v-col
                v-if="todos.length"
                cols="12"
              >
                <div v-auto-animate>
                  <Todo
                    v-for="todo in todos"
                    :key="todo.id"
                    :todo="todo"
                  />
                </div>
              </v-col>
            </v-row>
          </v-main>
        </v-layout>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import Todo from "../components/Todo.vue";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useCollection } from "vuefire";
import { db } from "@/firebase";
/*
  Variables
*/
const loading = ref(true);
let dialog = ref(false); // to show Dialog when the user add Todo
const todos = ref([]);
/* */
const todoCollectionRef = collection(db, "todos");
const todoCollectionQuery = query(todoCollectionRef, orderBy("date", "desc"));
/*
  lifeCycleHooks
*/

onBeforeMount(() => {
  onSnapshot(todoCollectionQuery, (querySnapshot) => {
    let temp = [];
    querySnapshot.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
    todos.value = temp;
    loading.value = false;
  });
});

/*
  methods
*/
const clearTodo = async () => {
  for (let todo of todos.value) {
    await deleteDoc(doc(db, "todos", todo.id));
  }
  dialog.value = true;
};
</script>

<style scoped>
.v-list a {
  text-decoration: none;
  color: inherit;
}
.v-btn a {
  text-decoration: none;
  color: inherit;
}
/* transition */

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(-50px);
}
</style>
