<template>
  <v-app
    id="inspire"
    :theme="themeStore.getTheme"
  >
    <!-- Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      app
      :width="320"
    >
      <v-list>
        <v-list-item prepend-avatar="Pic.jpg">
          <v-list-item-title class="mb-1"> Ahmed Eishtawi </v-list-item-title>
          <v-list-item-subtitle>
            ahmed02.eishtawi@gmail.com
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-divider class="mt-n1"></v-divider>
      <!--  -->
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
          :to="item.to"
          color="blue-accent-3"
          class="my-2"
        >
          <v-list-item-content class="flex">
            <v-list-item-icon class="me-5">
              <v-icon
                :icon="item.icon"
                base-color="grey-darken-4"
              ></v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- App Bar -->
    <v-app-bar>
      <v-app-bar-nav-icon
        :icon="drawer ? 'mdi-arrow-left-circle' : 'mdi-arrow-right-circle'"
        @click="drawer = !drawer"
        color="blue-accent-3"
      ></v-app-bar-nav-icon>
      <template v-slot:append>
        <v-btn
          variant="text"
          :ripple="true"
          size="xl"
          rounded="circle"
          class="mr-1 pa-3"
          @click="themeStore.toggleTheme"
        >
          <v-icon v-if="!themeStore.isDarkMode">
            <span
              class="material-icons light_mode"
              style="color: #2979ff"
            >
              light_mode
            </span>
          </v-icon>
          <v-icon v-else>
            <span
              class="material-icons dark_mode"
              style="color: #1867c0"
            >
              dark_mode
            </span>
          </v-icon>
        </v-btn>
      </template>
      <v-app-bar-title>
        <span>{{ $route.name }}</span>
      </v-app-bar-title>
    </v-app-bar>
    <!-- Main Content -->
    <v-main class="d-flex flex-column">
      <v-row class="rowMargin">
        <v-col>
          <router-view />
        </v-col>
      </v-row>
      <Footer />
    </v-main>
  </v-app>
</template>

/* */
<script setup>
import { ref } from "vue";
import Footer from "../components/Footer.vue";
import { useThemeStore } from "../stores/themeStore";

const drawer = ref(null);
const themeStore = useThemeStore();

const items = [
  { title: "Todo", icon: "mdi-format-list-checks", to: "/todo-list" },
  { title: "About", icon: "mdi-help-circle", to: "/about" },
];
</script>

<style>
.rowMargin {
  margin: -0.5px;
}
.flex {
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>
