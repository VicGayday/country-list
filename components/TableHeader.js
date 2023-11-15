var TableHeader = Vue.component("table-header", {
  props: ["columns"],
  template: `
    <div class="row" >
      <div
        v-for="column in columns" 
        v-if="column.show"
        :key="column.headerName"
        class="box"
      >
      {{ column.headerName }}
      </div>
    </div>
  `,
})
