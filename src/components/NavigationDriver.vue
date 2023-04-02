<template>
    <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-format-align-center" title="Articles" value="articles"></v-list-item>
          <v-list-item prepend-icon="mdi-alert-circle-outline" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDriver",
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>