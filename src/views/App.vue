<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <!-- .prevent cancela la recarga de la página cuando se manda datos en el button-->
              <form @submit.prevent="sendPanel">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="panel.name"
                    placeholder="Nom du panneau"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    v-model="panel.azimut"
                    placeholder="Azimut"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    v-model="panel.elevation"
                    placeholder="Élévation"
                    class="form-control"
                  />
                </div>
                <template v-if="edit===false">
                  <button class="btn btn-primary btn-block">Enviar</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Modifier</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Azimut</th>
                <th>Elévation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="panel of panels" :key="panel._id">
                <td>{{panel.name}}</td>
                <td>{{panel.azimut}}</td>
                <td>{{panel.elevation}}</td>
                <td>
                  <button @click="deletePanel(panel._id)" class="btn btn-danger">Suprimer</button>
                  <button @click="updatePanel(panel._id)" class="btn btn-secondary">Modifier</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Panel {
  constructor(name, azimut, elevation, description) {
    this.name = name;
    this.azimut = azimut;
    this.elevation = elevation;
    this.description = description;
  }
}
export default {
  name: "Panel",
  data() {
    return {
      panel: new Panel(),
      panels: [] /* array pour remplir les données de la bd, c'est-à-dire les panneaux*/,
      edit: false,
      panelToEdit: ""
    };
  },
  created() {
    this.getPanels();
  },
  methods: {
    sendPanel() {
      if (this.edit === false) {
        this.axios
          .post("/panel", this.panel)
          .then(res => {
            /* On peut utiliser .push mais avec getPanels() ca marche
            this.panels.push(res.data); */
            this.getPanels();
          })
          .catch(error => {
            console.log(error.response);
          });
      } else {
        this.axios
        .put(`/panel/${this.panelToEdit}`, this.panel)
        .then(res => {
          this.getPanels();
        });
      }

      /* pour effacer les données quand on charge la page */
      this.panel = new Panel();
    },
    getPanels() {
      this.axios
        .get("/panel")
        .then(res => {
          console.log(res);
          this.panels = res.data["panels"];
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    deletePanel(id) {
      this.axios
        .delete(`/panel/${id}`)
        .then(res => {
          this.getPanels();
          /* Ou on peut utiliser splice pour eliminer dans le front */
          /* const index = this.panels.findIndex(
            item => item._id === res.data._id
          );
          this.notas.splice(index, 1); */
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    updatePanel(id) {
      this.axios
        .get(`/panel/${id}`)
        .then(res => {
          console.log(res.data.panel);
          /* Cest pour remplir le formulaire */
          this.panel = new Panel(
            res.data["panel"].name,
            res.data["panel"].azimut,
            res.data["panel"].elevation
            /* Ou */
            /*
            res.data.panel.name,
            res.data.panel.azimut,
            res.data.panel.elevation
            */
          );
          this.panelToEdit = res.data["panel"]._id;
          this.edit = true;
        })
        .catch(error => {
          console.log(error.response);
        });
      /*       fetch("/api/panel/" + id)
        .then(res => res.json())
        .then(data => {
          this.panel = new Panel(
            data["panel"].name,
            data["panel"].azimut,
            data["panel"].elevation,
            data["panel"].description
          );
          this.panelToEdit = data["panel"]._id;
          this.edit = true;
        }); */
    }
  }
};
</script>

<style>
</style>