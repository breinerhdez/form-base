import Vue from "vue";

const urlBase = `http://localhost:5000`;

Vue.component("fieldset-list", {
  data: function () {
    return { fieldsets: [] };
  },

  mounted() {
    console.log("Componente montado", formId.value);
    let self = this;
    getFieldsets(formId.value)
      .then(function (response) {
        console.log(response);
        self.fieldsets = response.result;
      })
      .catch(function (reject) {
        console.log("REJECTED: ", reject);
      });
  },

  template: `
  <div>
    <div class="row">
      <div class="col-md-3 font-weight-bolder">Legend</div>
      <div class="col-md-3 font-weight-bolder">Acciones</div>
    </div>
    <div v-for="(item, index) in fieldsets" class="row">
      <div class="col-md-3">{{item.legend}}</div>
      <div class="col-md-3">---</div>
    </div>
    hola
  </div>
  `,
});

let app = new Vue({
  el: "#app",

  // components: {
  //   "fieldset-list": fieldsetListComponent,
  // },

  data: {
    title: "Este es un nuevo inicio",
    formLegend: "",
  },

  methods: {
    logSomeThing() {
      return "Hello Wisdom Ekpot 2390";
    },

    addFieldset() {
      // this.fieldsets.push(this.fieldsetname);
      // this.fieldsetname = "";
    },

    sendForm(e) {
      e.preventDefault();
      console.log("Enviando formulario", this.formLegend);
      let url = e.target.action;
      let data = { legend: this.formLegend };
      sendData(url, data, { method: "POST" }).then(function (response) {
        console.log(res);
      });
    },
  },

  mounted() {
    console.log(this.logSomeThing(), this.formId);
    // let self = this;
    // getFieldsets(this.formId)
    //   .then(function (response) {
    //     console.log(response);
    //     self.fieldsets = response.result;
    //   })
    //   .catch(function (reject) {
    //     console.log("REJECTED: ", reject);
    //   });
  },
});

async function sendData(url, data = {}, conf = { method: "GET" }) {
  // conf.body = JSON.stringify(data);
  if (data) conf.body = data;
  const response = await fetch(url, conf);
  return response.json();
}

async function getFieldsets(form_id) {
  let url = `${urlBase}/admin/form-config/getForm/${form_id}`;
  const response = await fetch(url);
  return response.json();
}
