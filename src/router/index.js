import { createRouter, createWebHashHistory } from "vue-router";
import TodoList from "../views/TodoList.vue";
import About from "../views/About.vue";
import AddTodo from "../views/ManageTodo/AddTodo.vue";
import EditTodo from "../views/ManageTodo/EditTodo.vue";
import PageNotFound404 from "../views/PageNotFound404.vue";

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
    path: "/todo/:id",
    name: "EditTodo",
    component: EditTodo,
    props: true,
  },
  {
    path: "/all-todos",
    redirect: "/",
  },
  /* Catch All 404 */
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: PageNotFound404,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
