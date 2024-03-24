<template>
  <div
    class="todo"
    :class="{ completed: todo.isCompleted }"
  >
    <v-list lines="three">
      <v-list-item>
        <div>
          <v-list-item-title class="mb-2 d-flex justify-space-between">
            <div
              max-width="300"
              class="d-inline overflow-auto"
            >
              <h4
                @click="showDetails = !showDetails"
                class="cursor-pointer"
                :class="{ 'active-h4': showDetails }"
              >
                {{ todo.title }}
              </h4>
              <v-tooltip
                activator="parent"
                location="end"
              >
                Show Details
              </v-tooltip>
            </div>
            <!--  -->
            <div class="icons">
              <router-link
                :to="{
                  name: 'EditTodo',
                  params: { id: todo.id },
                  props: { todo: todo },
                }"
                ><span class="material-icons edit">edit</span></router-link
              >
              <span
                @click="deleteTodo(todo.id)"
                class="material-icons cursor-pointer delete"
                >delete</span
              >
              <span
                @click="completeTodo(todo)"
                class="material-icons cursor-pointer complete"
              >
                done
              </span>
            </div>
          </v-list-item-title>
        </div>

        <v-list-item-subtitle v-if="showDetails">
          {{ todo.details }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

defineProps(["todo"]);

/*
  methods
*/
const deleteTodo = (id) => deleteDoc(doc(db, "todos", id));

const completeTodo = (todo) => {
  updateDoc(doc(db, "todos", todo.id), {
    isCompleted: !todo.isCompleted,
  });
};

const showDetails = ref(false);
</script>

<style scoped>
.todo {
  border-left: 4px solid #ff2c2c;
  transition: all 0.5s ease;
}

.completed {
  border-left: 4px solid #42b983;
}

/* list styling */
.material-icons {
  font-size: 26px;
  padding: 0 3px;
  margin-left: 6px;
  color: #bbb;
}
.material-icons:hover {
  transition: all 0.5s ease;
}
.active-h4 {
  color: #2979ff;
}
h4:hover {
  transition: all 0.5s ease;
  color: #2979ff;
}
/* icons hover */
.delete:hover {
  color: crimson;
}
.complete:hover {
  color: #42b983;
}
.edit:hover {
  color: rgb(235, 178, 34);
}
</style>
