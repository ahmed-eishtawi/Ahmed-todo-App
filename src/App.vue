<template>
  <v-app id="inspire" :theme="isDarkMode ? 'dark' : 'light'">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense nav>
        <v-list-item
          title="Ahmed Todo App"
          subtitle="The Best Todo App"
          base-color="primary"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
          :to="item.to"
          color="primary"
        >
          <v-list-item-content class="flex">
            <v-list-item-icon class="me-5">
              <v-icon :icon="item.icon" base-color="#000"></v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        color="primary"
      ></v-app-bar-nav-icon>
      <template v-slot:append>
        <v-switch
          class="ma-auto pe-5"
          color="primary"
          base-color="primary"
          v-model="isDarkMode"
        >
          <template v-slot:append>
            <span
              v-if="isDarkMode"
              class="material-icons light_mode"
              style="color: #1867c0"
            >
              light_mode
            </span>
            <span
              v-else
              class="material-icons dark_mode"
              style="color: #1867c0"
            >
              dark_mode
            </span>
          </template>
        </v-switch>
      </template>
      <v-app-bar-title> Todo </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-row>
        <v-col>
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>
/* */
<script setup>
import { ref } from "vue";

const drawer = ref(null);
const isDarkMode = ref(false);

const items = [
  { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
  { title: "About", icon: "mdi-help-circle", to: "/about" },
];
</script>

//
<script>
// export default {
//   data: () => ({ drawer: null }),
// };
//
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: start;
  align-items: center;
}
</style>
