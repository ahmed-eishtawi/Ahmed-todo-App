<template>
  <v-row class="py-3">
    <v-col cols="12" sm="12" lg="7" class="mx-auto">
      <v-card class="mb-xs-5 mb-lg-0" color="grey-lighten-3" width="100%">
        <v-layout>
          <!-- Todo Bar -->
          <v-app-bar color="blue-accent-3">
            <v-app-bar-title>Todo</v-app-bar-title>

            <v-btn icon>
              <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props">mdi-dots-vertical</v-icon>
                </template>
                <v-list class="pa-0">
                  <router-link :to="{ name: 'AddTodo' }">
                    <v-list-item append-icon="mdi-plus">
                      <v-list-item-title class="cursor-pointer"
                        >Add Todo</v-list-item-title
                      >
                    </v-list-item>
                  </router-link>
                  <v-list-item append-icon="mdi-delete">
                    <v-list-item-title @click="clearTodo" class="cursor-pointer"
                      >Clear All Todo</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </v-app-bar>

          <!-- List -->
          <v-main>
            <v-row dense color="">
              <!-- When there is no todo, show this -->
              <!-- <v-card v-if="!todos.length" class="w-100 py-10">
                <div
                  class="d-flex flex-column justify-space-evenly align-center h-75"
                >
                  <h1 class="text-blue-accent-3 h1 text-center mb-3">
                    No Todo yet. 📃
                  </h1>
                  <v-img class="w-100 h-75" src="../img/EmptyTodo.svg" alt="" />
                </div>
              </v-card> -->
              <v-col v-if="todos.length" cols="12">
                <Todo v-for="todo in todos" :key="todo.id" :todo="todo" />
              </v-col>
            </v-row>
          </v-main>
        </v-layout>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import Todo from "../components/Todo.vue";
import { useThemeStore } from "../stores/themeStore.js";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
/*
  Variables
*/
const showDetails = ref(false);
const theme = useThemeStore();
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
      const todo = {
        id: doc.id,
        title: doc.data().title,
        details: doc.data().details,
        isCompleted: doc.data().isCompleted,
      };
      temp.push(todo);
    });
    todos.value = temp;
  });
});

/*
  methods
*/
const clearTodo = () => (todos.value = []);
</script>

<style scoped>
.v-list a {
  text-decoration: none;
  color: inherit;
}
</style>
