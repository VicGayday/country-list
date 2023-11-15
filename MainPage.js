var MainPage = Vue.component("main-page", {
  components: {
    "country-table": CountryTable,
    "table-header": TableHeader,
    "the-footer": TheFooter,
    "the-loader": TheLoader,
  },
  data() {
    return {
      countries: [],
      pagination: {},
      filter: "",
      page: 1,
      totalCount: 0,
      pages: 0,
      isLoading: true,
      paginationRange: [],

      columns: [
        { headerName: "Код фильтрации", name: "iso_3166_1_a2", show: true },
        {
          headerName: "Сокращенное наименование",
          name: "iso_3166_1_a3",
          show: true,
        },
        { headerName: "Код страны", name: "iso_3166_1_numeric", show: true },
        {
          headerName: "Полное наименование",
          name: "printable_name",
          show: true,
        },
        { headerName: "name", name: "name", show: false },
        { headerName: "display_order", name: "display_order", show: false },
        {
          headerName: "Возможность доставки",
          name: "is_shipping_country",
          show: true,
        },
      ],
    };
  },

  methods: {
    fetchCountries() {
      this.isLoading = true;
      fetch("https://devops100.site/test/", {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filters: {
            iso_3166_1_a2: this.filter,
          },
          paginate: {
            page: this.page,
            pp_items: 10,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.pagination = data.page_data.rpag;
          this.countries = data.page_data.data;
          if (this.page === 1) {
            this.pages = this.pagination.pages;
            this.totalCount = this.pagination.total_count;
          }
          this.paginationRange = pagination(this.page, this.pages);
          this.isLoading = false;
        });
    },

    filterCountries() {
      this.fetchCountries();
    },

    changePage(p) {
      this.page = p;
      this.fetchCountries();
    },
  },
  mounted() {
    this.fetchCountries();
  },
  template: `
    <div class="main">
      <div class="modal" v-if="isLoading">
        <the-loader />
      </div>
      <div  class="container">
        <h1 class="h1">Список стран</h1>
        <input
          type="text"
          name="country-filter"
          v-model="filter"
          @input="filterCountries"
          placeholder="Введите код страны, указанный в поле код фильтрации"
          class="input"
        >
          <country-table
            :countries="countries"
            :columns="columns"
            :is-loading="isLoading"
          >
          </country-table>
          <the-footer
            :pagination=pagination
            :totalCount=totalCount
            :pages=pages
            :page=page
            @changePage="changePage"
            :range=paginationRange
          >
          </the-footer>
        </div>

    </div>`,
});
