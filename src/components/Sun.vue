<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <b-card bg-variant="light" style="height:100%">
            <b-form @submit.prevent="getPositionSun">
              <b-form-group label="Latitude:" >
                <b-form-input v-model="sun.latitude"></b-form-input>
              </b-form-group>

              <b-form-group label="Longitude:">
                <b-form-input v-model="sun.longitude"></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-calendar block v-model="sun.date" locale="fr-FR"></b-calendar>
              </b-form-group>

              <b-form-group>
                <b-time v-model="sun.time" locale="en" class="ml-auto"></b-time>
              </b-form-group>
              <b-form-group label="GMT :" label-for="num">
                <b-form-input v-model="sun.gmtdiff" id="num" type="number" style="width:200px"></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-button block type="submit" variant="danger" style="right">Calculer</b-button>
              </b-form-group>
            </b-form>
          </b-card>
        </div>
        <div class="col-md-6">
          <b-card bg-variant="light" style="height:100%">
            <p class="h2 mb-2">
              <b-icon icon="brightness-alt-high"></b-icon> Azimuth: {{azimuth}}°
            </p>
            <p class="h2 mb-2">
              <b-icon icon="house-fill"></b-icon> Hauteur: {{elevation}}°
            </p>
            <p class="h5 mb-2">
              <b-icon icon="calendar-date"></b-icon> Date: {{sun.date}}
            </p>
            <p class="h5 mb-2">
              <b-icon icon="clock"></b-icon> Heure: {{sun.time}}
            </p>
            <p class="h5 mb-2">
              <b-icon icon="brightness-alt-low"></b-icon> Latitude: {{sun.latitude}}
            </p>
            <p class="h5 mb-2">
              <b-icon icon="brightness-alt-high-fill"></b-icon> Longitude: {{sun.longitude}}
            </p>
            <p class="h5 mb-2">
              <b-icon icon="brightness-alt-high-fill"></b-icon> GMT {{sun.gmtdiff}}
            </p>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Sun {
  constructor(date, time, latitude, longitude, gmtdiff) {
    this.date = date;
    this.time = time;
    this.latitude = latitude;
    this.longitude = longitude;
    this.gtmdiff = gmtdiff;
  }
}

export default {
  name: "Sun",
  data() {
    return {
      sun: new Sun(),
      azimuth:"",
      elevation:""
    };
  },
  methods: {
    getPositionSun() {
      this.axios
        .post(`/position/sun`, this.sun)
        .then(res => {
          console.log(res.data);
          this.azimuth= (res.data._azimuth).toFixed(2);
          this.elevation= (res.data._altitude).toFixed(2);
        })
        .catch(error => {
          console.log("Erreur : ", error);
        });
    }
  }
};
</script>