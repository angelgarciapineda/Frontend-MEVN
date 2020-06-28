<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-container>
        <b-navbar-brand :to="{name:'Home'}">NavBar</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="Logement" active>
          <CreateHome />
        </b-tab>
        <b-tab title="Position du soleil">
          <Sun />
        </b-tab>
        <b-tab title="Panneau">
          <Panel />
        </b-tab>
        <b-tab title="Cible">
          <Target />
        </b-tab>
        <b-tab title="Plage horaire">
          <b-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum illum saepe obcaecati error accusantium a reiciendis nam dignissimos laborum magni ad, odio eum nulla quam similique, odit sapiente recusandae non?</b-card-text>
        </b-tab>
        <b-tab title="Météo">
          <Weather />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import CreateHome from "@/components/CreateHome.vue";
import Weather from "@/components/Weather.vue";
import Sun from "@/components/Sun.vue";
import Panel from "@/components/Panel.vue";
import Target from "@/components/Target.vue";

export default {
  name: "User-home",
  components: {
    CreateHome,
    Weather,
    Sun,
    Panel,
    Target
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style>
</style>