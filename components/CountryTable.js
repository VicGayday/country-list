var CountryTable = Vue.component("country-table", {
  props: ["countries", "columns", "isLoading"],
  components: {
    "table-header": TableHeader,
  },
  filters: {
    booleanValue(value) {
      const x = typeof value;
      switch (x) {
        case "boolean":
          return value ? "да" : "нет";
        case "string":
          return value;
        default:
          return value;
      }
    },
  },
  template: `
    <div>
      <table-header :columns="columns"></table-header>
      <div v-if="!countries.length && !isLoading">Нет данных, соответствующих условиям поиска</div>
      <div
          v-else
          v-for="row in countries"
          :key="row.iso_3166_1_a2"
          class="row"
        >
          <div
            v-for="column in columns"
            v-if="column.show"
            :key="column.name"
            class="box"
          >
          {{ row[column.name] | booleanValue }}
          </div>
      </div>
    </div>
  `,
});
