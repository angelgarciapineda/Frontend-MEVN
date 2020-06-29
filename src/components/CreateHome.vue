<template>
  <div>
    <div class="row pt-5">
      <div class="col-md-4">
        <b-card bg-variant="light">
          <b-form @submit.prevent="saveHome" autocomplete="off">
            <p class="h2">Créer un nouveau logement : </p>
            <b-form-group label-cols-sm="3" label="Nom:" label-align-sm="right">
              <b-form-input v-model="home.name"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Rue:" label-align-sm="right">
              <b-form-input v-model="home.street"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Code Postal:" label-align-sm="right">
              <b-form-input v-model="home.postalcode"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Ville:" label-align-sm="right">
              <b-form-input v-model="home.city"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Latitude:" label-align-sm="right">
              <b-form-input v-model="home.latitude"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Longitude:" label-align-sm="right">
              <b-form-input v-model="home.longitude"></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-button type="submit" variant="dark" style="float:right">
                <b-icon icon="search" aria-hidden="true"></b-icon>Enregistrer
              </b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </div>
      <div class="col-md-8">
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Rue</th>
              <th>Code Postal</th>
              <th>Ville</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="home of homes" :key="home._id">
              <td>{{home.name}}</td>
              <td>{{home.street}}</td>
              <td>{{home.postalcode}}</td>
              <td>{{home.city}}</td>
              <td>{{home.latitude}}</td>
              <td>{{home.longitude}}</td>
              <td>
                <!-- <button class="btn btn-danger">Suprimer</button> -->
                <b-button type="submit" variant="danger">
                  <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                </b-button>
                <b-button type="submit" variant="warning">
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                </b-button>
                <!-- <button class="btn btn-secondary">Modifier</button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
class Home {
  constructor(name, street, postalcode, city, latitude, longitude) {
    this.name = name;
    this.street = street;
    this.postalcode = postalcode;
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
export default {
  name: "CreateHome",
  data() {
    return {
      home: new Home(),
      homes: [],
      idUser: ""
    };
  },
  created() {
    this.idUser = this.$route.params.id;
    this.getHomes();
  },
  methods: {
    saveHome() {
      //console.log(this.$route.params.id);
      console.log(this.idUser);
      this.axios
        .post(`/home/${this.idUser}`, this.home)
        .then(res => {
          /* console.log(res.data); */
          this.getHomes();
        })
        .catch(error => {
          console.log(error);
        });
      this.home = new Home();
    },
    getHomes() {
      this.axios
        .get(`/home/${this.idUser}`)
        .then(res => {
          /* console.log(res.data);
          console.log(res.data.user.homes); */
          this.homes = res.data.user.homes;
        })
        .catch(error => {
          console.log("Hay un error: ", error);
        });
    }
  }
};
</script>

<style>
</style>