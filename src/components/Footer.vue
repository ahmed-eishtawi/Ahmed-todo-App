<template>
  <div class="text-center py-0">
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon.icon"
        :color="icon.color"
        class="mx-3"
        variant="text"
        :href="icon.link"
        target="blank"
      ></v-btn>
    </div>
    <div class="mb-2">
      Made by:
      <strong style="color: #2979ff">Ahmed Eishtawi </strong>
      {{ new Date().getFullYear() }}
      <span>&copy;</span>
    </div>
  </div>
</template>

<script setup>
const icons = [
  {
    icon: "mdi-facebook",
    color: "blue-accent-3",
    link: "https://www.facebook.com/ahmed.eishtewi.02.a/",
  },
  {
    icon: "mdi-github",
    color: "dark",
    link: "https://github.com/ahmed-eishtawi",
  },
  {
    icon: "mdi-linkedin",
    color: "primary",
    link: "https://www.linkedin.com/in/ahmed-eishtewi-3a59822a6/",
  },
  {
    icon: "mdi-telegram",
    color: "primary",
    link: "https://t.me/ahmed_eishtawi",
  },
];
</script>

<style></style>
