import { createRouter, createWebHistory } from "vue-router";
import MainApp from "../views/MainApp.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import TodoList from "../views/TodoList.vue";
import About from "../views/About.vue";
import AddTodo from "../views/ManageTodo/AddTodo.vue";
import EditTodo from "../views/ManageTodo/EditTodo.vue";
import PageNotFound404 from "../views/PageNotFound404.vue";
//
// import auth
import { auth } from "../firebase";
//

// function to protect routes

//
const routes = [
  {
    path: "/",
    name: "Todo App",
    component: MainApp,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/todo-list",
        name: "Todo List",
        component: TodoList,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/about",
        name: "About",
        component: About,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/add-todo",
        name: "Add Todo",
        component: AddTodo,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/todo/:id",
        name: "EditTodo",
        component: EditTodo,
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/all-todos",
        redirect: "/",
      },
      /* Catch All 404 */
      {
        path: "/:pathMatch(.*)*",
        name: "Not Found",
        component: PageNotFound404,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Not Found",
    component: PageNotFound404,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (auth.currentUser) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
