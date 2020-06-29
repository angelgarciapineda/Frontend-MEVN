<template>
  <div>
    <div class="row pt-5">
      <div class="col-md-4">
        <b-card bg-variant="light">
          <b-form @submit.prevent="addPanel" autocomplete="off">
            <p class="h2">Choissisez une maison :</p>
            <b-form-select v-model="selected">
              <b-form-select-option
                v-for="home of homes"
                :key="home._id"
                :value="home"
              >{{home.name}}</b-form-select-option>
              <!-- <option v-for="home of homes" :key="home._id" :value="home">{{home.name}}</option> -->
            </b-form-select>
            <p>Maison : {{selected.name}}</p>
            <p>Rue : {{selected.street}}</p>
            <p></p>
            <b-form-group label-cols-sm="3" label="Nom:" label-align-sm="right">
              <b-form-input v-model="panel.name"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Azimuth:" label-align-sm="right">
              <b-form-input v-model="panel.azimuth"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Hauteur:" label-align-sm="right">
              <b-form-input v-model="panel.elevation"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Latitude:" label-align-sm="right">
              <b-form-input v-model="panel.latitude"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Longitude:" label-align-sm="right">
              <b-form-input v-model="panel.longitude"></b-form-input>
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
              <th>Panel</th>
              <th>Azimuth</th>
              <th>Hauteur</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="panel of panels" :key="panel._id">
              <td>{{panel.name}}</td>
              <td>{{panel.azimuth}}</td>
              <td>{{panel.elevation}}</td>
              <td>{{panel.latitude}}</td>
              <td>{{panel.longitude}}</td>
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
class Panel {
  constructor(name, azimuth, elevation, latitude, longitude) {
    this.name = name;
    this.azimuth = azimuth;
    this.elevation = elevation;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
export default {
  name: "Panel",
  data() {
    return {
      idUser: "",
      homes: [],
      panels: [],
      selected: "",
      panel: new Panel()
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
          console.log("Hay un error: ", error);
        });
    },
    addPanel() {
      this.axios
        .post(`/panel/${this.selected._id}`, this.panel)
        .then(res => {
          this.getPanels();
        })
        .catch(error => {
          console.log("ERREUR : ", error);
        });
    },
    getPanels() {
      this.axios
        .get(`/panel/${this.selected._id}`)
        .then(res => {
          console.log(res.data);
          this.panels = res.data.home.panels;
        })
        .catch(error => {
          console.log("ERREUR : ", error);
        });
    }
  }
};
</script>