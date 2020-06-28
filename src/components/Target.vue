<template>
  <div>
    <div class="row p-5">
      <div class="col-md-7">
        <b-card bg-variant="light">
          <b-form @submit.prevent="addTarget">
            <b-form-select v-model="selected">
              <option v-for="home of homes" :key="home._id" :value="home">{{home.name}}</option>
            </b-form-select>
            <h2>Maison choisie:</h2>
            <!-- {{selected._id}} -->
            <p>Maison : {{selected.name}}</p>
            <p>Rue : {{selected.street}}</p>
            <b-form-group
              label-cols-lg="3"
              label="Créer un nouveau cible"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
              <b-form-group label-cols-sm="3" label="Nom:" label-align-sm="right">
                <b-form-input v-model="target.name"></b-form-input>
              </b-form-group>

              <b-form-group label-cols-sm="3" label="Latitude:" label-align-sm="right">
                <b-form-input v-model="target.latitude"></b-form-input>
              </b-form-group>

              <b-form-group label-cols-sm="3" label="Longitude:" label-align-sm="right">
                <b-form-input v-model="target.longitude"></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-button type="submit" variant="dark" style="float:right">
                  <b-icon icon="search" aria-hidden="true"></b-icon>Enregistrer
                </b-button>
              </b-form-group>
            </b-form-group>
          </b-form>
        </b-card>
      </div>
    </div>
    <div class="p-5">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="target of targets" :key="target._id">
            <td>{{target.name}}</td>
            <td>{{target.latitude}}</td>
            <td>{{target.longitude}}</td>
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
class Target {
  constructor(name, latitude, longitude) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
export default {
  name: "Target",
  data() {
    return {
      idUser: "",
      selected: "",
      homes: [],
      targets: [],
      selected: "",
      target: new Target()
    };
  },
  created() {
    this.idUser = this.$route.params.id;
    this.getHomes();
  },
  methods: {
    getHomes() {
      this.axios
        .get(`/home/${this.idUser}`)
        .then(res => {
          /* console.log(res.data);
          console.log(res.data.user.homes); */
          this.homes = res.data.user.homes;
        })
        .catch(error => {
          console.log("ERREUR : ", error);
        });
    },
    addTarget() {
      this.axios
        .post(`/target/${this.selected._id}`, this.target)
        .then(res => {
          this.getTargets();
        })
        .catch(error => {
          console.log("ERREUR : ", error);
        });
    },
    getTargets() {
      this.axios
        .get(`/target/${this.selected._id}`)
        .then(res => {
          console.log(res.data);
          this.targets = res.data.home.targets;
        })
        .catch(error => {
          console.log("ERREUR : ", error);
        });
    }
  }
};
</script>

<style>
</style>