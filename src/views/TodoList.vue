<template>
  <v-row class="py-3">
    <v-col cols="12" xs="12" lg="7" class="mx-auto">
      <div max-width="448">
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
                      <v-list-item>
                        <v-list-item-title class="cursor-pointer"
                          >Add Todo</v-list-item-title
                        >
                      </v-list-item>
                    </router-link>
                    <v-list-item>
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
              <v-row dense>
                <v-col cols="12" class="">
                  <Todo v-for="todo in todos" :key="todo.id" :todo="todo" />
                </v-col>
              </v-row>
            </v-main>
          </v-layout>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import Todo from "../components/Todo.vue";
/*
  Variables
*/
const showDetails = ref(false);

const todos = ref([
  {
    id: 1,
    title: "Go Shopping",
    details: "Notify me about updates to apps or games that I downloaded",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Have Lunch",
    details: "lorem ipsum",
    isCompleted: true,
  },
  {
    id: 3,
    title: "Meet With Friends",
    details: "lorem ipsum lorem",
    isCompleted: false,
  },
]);

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
