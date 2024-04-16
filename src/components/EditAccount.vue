<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-account"
        title="User Profile"
      >
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="First name*"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                hint="example of helper text only on focus"
                label="Middle name"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                hint="example of persistent helper text"
                label="Last name*"
                persistent-hint
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Email*"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                label="Confirm Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required
              ></v-select>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-autocomplete
                :items="[
                  'Skiing',
                  'Ice hockey',
                  'Soccer',
                  'Basketball',
                  'Hockey',
                  'Reading',
                  'Writing',
                  'Coding',
                  'Basejump',
                ]"
                label="Interests"
                auto-select-first
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis"
            >*indicates required field</small
          >
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Cancel"
            variant="plain"
            @click="$emit('cancel')"
          ></v-btn>

          <v-btn
            color="green-darken-1 text-center"
            text="Save"
            variant="tonal"
            @click="$emit('save', valid)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
//
// variables
const dialog = true
const valid = ref(false);
//
// rules
</script>

<style></style>
