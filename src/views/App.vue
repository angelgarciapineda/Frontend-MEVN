<template>
  <div>
    <div>
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Logement" active>
            <CreateHome/>
          </b-tab>
          <b-tab title="Position du soleil">
            <Sun/>
          </b-tab>
          <b-tab title="Panneau">
            <b-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptate id est deleniti sint iste autem iure quas, quisquam dolorem pariatur, reiciendis, ut nam ratione magni dolore vitae fugiat modi.</b-card-text>
          </b-tab>
          <b-tab title="Cible">
            <b-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quisquam, numquam assumenda corporis id ratione vel quo magnam harum, debitis amet dignissimos vitae fugiat doloremque veniam perspiciatis enim sit incidunt.</b-card-text>
          </b-tab>
          <b-tab title="Plage horaire">
            <b-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum illum saepe obcaecati error accusantium a reiciendis nam dignissimos laborum magni ad, odio eum nulla quam similique, odit sapiente recusandae non?</b-card-text>
          </b-tab>
          <b-tab title="Météo">
            <Weather/>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import CreateHome from '@/components/CreateHome.vue'
import Weather from '@/components/Weather.vue'
import Sun from '@/components/Sun.vue'

export default {
  name: "User-home",
  components:{
    CreateHome,
    Weather,
    Sun
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  }
};
</script>

<style>
</style>