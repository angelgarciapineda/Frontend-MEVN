<template>
  <div class="row">
    <div class="col-md-4">
      <h3>Créer un nouveau logement</h3>
      <form @submit.prevent="saveHome" autocomplete="off" >
        <div class="form-group">
          <label for="_nom">Nom du logement</label>
          <input
            v-model="home.name"
            type="text"
            placeholder="Maison d'été"
            class="form-control"
            id="_nom"
          />
        </div>
        <div class="form-group">
          <label for="_rue">Rue</label>
          <input
            v-model="home.street"
            type="text"
            placeholder="1 rue Henri Lasne"
            class="form-control"
            id="_rue"
          />
        </div>
        <div class="form-group">
          <label for="_codepostal">Code Postal</label>
          <input
            v-model="home.postalcode"
            type="text"
            placeholder="44000"
            class="form-control"
            id="_codepostal"
          />
        </div>
        <div class="form-group">
          <label for="_ville">Ville</label>
          <input
            v-model="home.city"
            type="text"
            placeholder="Nantes"
            class="form-control"
            id="_ville"
          />
        </div>
        <div class="form-group">
          <label for="_latitude">Latitude</label>
          <input
            v-model="home.latitude"
            type="text"
            placeholder="47.2173"
            class="form-control"
            id="_latitude"
          />
        </div>
        <div class="form-group">
          <label for="_longitude">Longitude</label>
          <input
            v-model="home.longitude"
            type="text"
            placeholder="-1.5534"
            class="form-control"
            id="_longitude"
          />
        </div>
        <template>
          <button class="btn btn-primary btn-block">Enviar</button>
        </template>
        <template>
          <button class="btn btn-primary btn-block">Modifier</button>
        </template>
      </form>
    </div>
    <!-- Table de logement -->
    <div class="col-md-8">
      <table class="table table-bordered">
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
          console.log(res.data);
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
          console.log(res.data);
          console.log(res.data.user.homes);
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