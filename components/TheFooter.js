var TheFooter = Vue.component("the-footer", {
  props: {
    pagination: { type: Object, require: true },
    totalCount: { type: Number, default: 1 },
    pages: { type: Number, default: 1 },
    page: { type: Number, default: 1 },
    range: { type: Array, require: true },
  },
  component: { pagination },
  data() {
    return {
      dots: "...",
    };
  },
  computed: {
    pageSize() {
      if (this.pagination.start_index === 0) {
        return 0;
      }
      return this.pagination.end_index - this.pagination.start_index + 1;
    },
  },
  methods: {
    changePage(p) {
      this.$emit("changePage", p);
    },
  },

  template: `
  <div class="footer">
    <span class="span">{{ pageSize }} из {{ totalCount }}</span>
    <div v-if="pages > 1" class="page-wrapper">
    <button
      class="page-btn arrow left"
      :class="{'disabled': page === 1}"
      @click="changePage(page-1)"
    ></button>
      <button
        v-for="(p,idx) in range"
        :key="'item-' + idx"
        @click="changePage(p)"
        class="page-btn"
        :class="{
            'current-page' : p === page,
            'dots' : p === dots
        }"
      >
        {{ p }}
      </button>
      <button
        class="page-btn arrow right"
        :class="{'disabled': page === pages}"
        @click="changePage(page+1)"
        ></button>
    </div>
  </div>
    `,
});
