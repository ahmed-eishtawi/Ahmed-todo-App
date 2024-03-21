import { createRouter, createWebHashHistory } from "vue-router";
import TodoList from "../views/TodoList.vue";
import About from "../views/About.vue";
import AddTodo from '../views/ManageTodo/AddTodo.vue'
import EditTodo from '../views/ManageTodo/EditTodo.vue'

const routes = [
  {
    path: "/",
    name: "TodoList",
    component: TodoList,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/add-todo",
    name: "AddTodo",
    component: AddTodo,
  },
  {
    path: "/edit-todo",
    name: "EditTodo",
    component: EditTodo,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
