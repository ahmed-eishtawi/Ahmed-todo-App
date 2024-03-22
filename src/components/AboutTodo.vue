<template>
  <v-row>
    <v-col cols="12">
      <v-card
        class="ma-auto"
        prepend-icon="mdi-format-list-checks"
        max-width="320"
        color="blue-accent-3 rounded-lg mt-15"
      >
        <template v-slot:title>
          <div class="">Ahmed Todo App</div>
        </template>
        <v-card-text class="text-center mt-4"
          >Simple App And it`s Open Source <strong>:)</strong></v-card-text
        >
      </v-card>
      <v-card
        append-icon="mdi-open-in-new"
        class="mx-auto my-15"
        href="https://github.com/ahmed-eishtawi/Ahmed-todo-App"
        max-width="320"
        prepend-icon="mdi-github"
        rel="noopener"
        target="_blank"
        title="Ahmed Todo on GitHub"
        color="black"
      ></v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style></style>
