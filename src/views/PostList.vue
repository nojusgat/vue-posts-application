<template>
  <div class="container p-3">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <router-link :to="{ name: 'posts' }" class="title">
            Articles
          </router-link>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input
                class="input"
                type="text"
                v-model="search"
                placeholder="Search for an Article"
                @keyup.enter="submitSearch"
              />
            </p>
            <p class="control">
              <button class="button" @click="submitSearch">
                <span class="icon">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <span>Search</span>
              </button>
            </p>
          </div>
        </div>
        <div class="level-item">
          <button
            class="button is-primary"
            @click="openModal('ArticleFormModal', {})"
          >
            <span>Create Article</span>
          </button>
        </div>
      </div>
    </nav>
    <Message />
    <div v-if="error" class="notification is-danger">
      Could not get articles. Please try again later.
    </div>
    <div v-else-if="loading" class="columns is-multiline">
      <div
        v-for="n in pageLimit"
        class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen"
      >
        <div :key="n">
          <Skeleton height="226px" />
        </div>
      </div>
    </div>
    <div v-else-if="articles.length === 0" class="notification is-warning">
      There are no articles yet...
    </div>
    <div v-else class="columns is-multiline">
      <div
        v-for="article in articlesWithAuthor"
        class="column is-12-mobile is-6-tablet is-6-desktop is-4-widescreen"
      >
        <Article :key="article.id" :article="article" />
      </div>
    </div>
    <Pagination v-bind="pagination" />
  </div>
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";
import { messageMixin } from "../mixins/message";

import Article from "../components/Article.vue";
import Pagination from "../components/Pagination.vue";
import Message from "../components/Message.vue";

export default {
  name: "PostList",
  mixins: [messageMixin],
  data() {
    return {
      loading: true,
      error: false,
      pageLimit: 6,
      pagination: {
        current: Number(this.$route.query.page) || 1
      },
      search: this.$route.query.q || ""
    };
  },
  components: {
    Article,
    Pagination,
    Message,
    Skeleton
  },
  computed: {
    articles: {
      get() {
        return this.$store.state.articles;
      },
      set(value) {
        this.$store.commit("setArticles", value);
      }
    },
    authors: {
      get() {
        return this.$store.state.authors;
      },
      set(value) {
        this.$store.commit("setAuthors", value);
      }
    },
    articlesWithAuthor() {
      return this.articles.map(article => {
        const author = this.authors.find(author => author.id == article.author);
        const authorName = (author && author.name) || "unknown";
        return {
          ...article,
          author: {
            id: article.author,
            name: authorName
          }
        };
      });
    }
  },
  methods: {
    parsePaginationData(linkHeader) {
      const regex = new RegExp('<(.*?)>; rel="(.*?)"', "sg");
      const matches = [...linkHeader.matchAll(regex)];

      let pagination = matches.reduce((acc, match) => {
        let url = new URLSearchParams(new URL(match[1]).search);
        return {
          ...acc,
          [match[2]]: Number(url.get("_page"))
        };
      }, {});

      this.pagination = {
        ...pagination,
        current: this.pagination.current
      };
    },
    getArticles() {
      this.loading = true;
      this.$http
        .get("/articles", {
          params: {
            _page: this.pagination.current,
            _limit: this.pageLimit,
            q: this.search == "" ? null : this.search
          }
        })
        .then(response => {
          this.articles = response.data;
          this.parsePaginationData(response.headers.link);
        })
        .catch(err => {
          this.error = true;
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    openModal(component, props) {
      this.$store.commit("openModal", { component, props });
    },
    submitSearch() {
      if (this.search == "")
        return this.showMessage("warning", "Search field is empty");
      this.$router.push({ name: this.$route.name, query: { q: this.search } });
    }
  },
  created() {
    this.getArticles();
  },
  watch: {
    $route(to) {
      this.pagination.current = Number(to.query.page) || 1;
      this.search = to.query.q || "";
      this.getArticles();
    }
  }
};
</script>
