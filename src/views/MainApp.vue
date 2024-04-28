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
      <v-list v-if="userData">
        <v-list-item>
          <div class="d-flex align-center">
            <v-menu
              transition="slide-x-transition"
              min-width="200px"
              rounded
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  v-bind="props"
                  class="mb-1"
                  variant="text"
                >
                  <v-avatar
                    v-if="userData.photoUrl"
                    :image="userData.photoUrl.toString()"
                    size="large"
                  >
                  </v-avatar>
                  <!--  -->
                  <v-avatar
                    v-else
                    :image="`https://placehold.jp/100/${getBackgroundColor}/${getTextColor}/200x200.png?text=${userData.firstName
                      .toUpperCase()
                      .charAt(0)}${userData.lastName
                      .toUpperCase()
                      .charAt(0)}&css=%7B%22border-radius%22%3A%2250%25%22%7D`"
                    size="large"
                  >
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <div>
                    <v-btn
                      variant="text"
                      rounded
                      prepend-icon="mdi-account-edit"
                      color="yellow-accent-4"
                      @click="editDialog = true"
                    >
                      Edit Account
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                      variant="text"
                      rounded
                      color="red accent-4"
                      prepend-icon="mdi-logout"
                      @click="
                        signOut(auth);
                        $router.push({ name: 'Login' });
                      "
                    >
                      Logout
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-menu>
            <!--  -->
            <v-list-item-title class="ml-4"
              ><strong>{{
                `${userData.firstName} ${userData.lastName}`
              }}</strong></v-list-item-title
            >
          </div>
        </v-list-item>
      </v-list>
      <!--  -->
      <v-skeleton-loader
        v-else
        type="list-item-avatar"
        class="mb-2"
      ></v-skeleton-loader>

      <v-divider></v-divider>
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
          <router-view v-slot="{ Component }">
            <transition
              name="fade"
              mode="out-in"
            >
              <component :is="Component" />
            </transition>
          </router-view>
          <EditAccount
            v-if="editDialog"
            @cancel="editDialog = false"
          />
        </v-col>
      </v-row>
      <Footer />
    </v-main>
  </v-app>
</template>

/* */
<script setup>
import { computed, onMounted, ref } from "vue";
import EditAccount from "../components/EditAccount";
import Footer from "../components/Footer.vue";
import { useThemeStore } from "../stores/useThemeStore";
import { signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { getUser } from "@/composables/getUser";
//
const drawer = ref(null);
const themeStore = useThemeStore();
const editDialog = ref(false); // to show edit account dialog
/*
  placeholder colors
*/
const darkMode = ref({
  backgroundColor: "2e2e2e",
  textColor: "2979ff",
});
const lightMode = ref({
  backgroundColor: "2979FF",
  textColor: "ffffff",
});

const getBackgroundColor = computed(() => {
  return themeStore.getTheme === "dark"
    ? darkMode.value.backgroundColor
    : lightMode.value.backgroundColor;
});
const getTextColor = computed(() => {
  return themeStore.getTheme === "dark"
    ? darkMode.value.textColor
    : lightMode.value.textColor;
});
//
/*
  dashboard
*/
const items = [
  { title: "Todo", icon: "mdi-format-list-checks", to: { name: "Todo List" } },
  { title: "About", icon: "mdi-help-circle", to: { name: "About" } },
];
//
/*
  user
*/
const { user } = { ...getUser() };
const userData = ref(null);
//
/*
 lifeCycleHooks
*/
onMounted(async () => {
  if (user.value) {
    try {
      const docRef = doc(db, "users", user.value.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        userData.value = docSnap.data();
      }
    } catch (err) {
      console.log(err);
    }
    // snapShot
    console.log(userData.value);
    if (userData) {
      onSnapshot(doc(db, "users", user.value.uid), (querySnapshot) => {
        userData.value = { ...querySnapshot.data() };
      });
    }
  }
});
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
/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
