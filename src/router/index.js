import { createRouter, createWebHistory } from "vue-router";
import MainApp from "../views/MainApp.vue";
import TodoList from "../views/TodoList.vue";
import About from "../views/About.vue";
import AddTodo from "../views/ManageTodo/AddTodo.vue";
import EditTodo from "../views/ManageTodo/EditTodo.vue";
import PageNotFound404 from "../views/PageNotFound404.vue";

const routes = [
  {
    path: "/",
    name: "app",
    component: MainApp,
    children: [
      {
        path: "/todo-list",
        name: "Todo List",
        component: TodoList,
        children: [],
      },
      {
        path: "/about",
        name: "About",
        component: About,
      },
      {
        path: "/add-todo",
        name: "Add Todo",
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
        name: "Not Found",
        component: PageNotFound404,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
