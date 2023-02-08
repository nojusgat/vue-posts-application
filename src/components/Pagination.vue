<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <a v-if="prev == null" class="pagination-previous" disabled>
      Previous
    </a>
    <router-link
      v-else
      class="pagination-previous"
      :to="{ name: $route.name, query: { ...$route.query, page: prev } }"
      :disabled="prev == null"
    >
      Previous
    </router-link>

    <a v-if="next == null" class="pagination-next" disabled>
      Next page
    </a>
    <router-link
      v-else
      class="pagination-next"
      :to="{
        name: $route.name,
        query: { ...$route.query, page: next }
      }"
    >
      Next page
    </router-link>
    <ul class="pagination-list">
      <li v-if="min > 1">
        <router-link
          class="pagination-link"
          aria-label="Goto page 1"
          :to="{
            name: $route.name,
            query: { ...$route.query, page: 1 }
          }"
        >
          1
        </router-link>
      </li>
      <li v-if="min > 2">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-for="page in pageNumbers">
        <router-link
          class="pagination-link"
          :class="{ 'is-current': current == page }"
          :aria-label="'Goto page ' + page"
          :to="{
            name: $route.name,
            query: { ...$route.query, page }
          }"
          :key="page"
        >
          {{ page }}
        </router-link>
      </li>
      <li v-if="max < last - 1">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="max < last">
        <router-link
          class="pagination-link"
          :aria-label="'Goto page ' + last"
          :to="{
            name: $route.name,
            query: { ...$route.query, page: last }
          }"
        >
          {{ last }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    prev: {
      type: Number,
      default: null
    },
    next: {
      type: Number,
      default: null
    },
    first: {
      type: Number,
      default: 1
    },
    current: {
      type: Number,
      default: 1
    },
    last: {
      type: Number,
      default: 1
    },
    buttonCount: {
      type: Number,
      default: 2
    }
  },
  computed: {
    min() {
      if (this.current - this.buttonCount < this.first) {
        return this.first;
      }
      return this.current - this.buttonCount;
    },
    max() {
      if (this.current + this.buttonCount > this.last) {
        return this.last;
      }
      return this.current + this.buttonCount;
    },
    pageNumbers() {
      let pages = [];
      if (this.max < 2) return pages;

      for (let i = this.min; i <= this.max; i++) {
        pages.push(i);
      }
      return pages;
    }
  }
};
</script>
